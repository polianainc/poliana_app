class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable, :omniauthable,
     :recoverable, :rememberable, :trackable, :validatable, :authentication_keys => [:login]

  attr_accessor :login

  attr_accessible :username, :email, :password, :password_confirmation, :remember_me, :invitation_key, :login, :as => [:default, :admin]
  attr_accessible :invitations_left, :as => :admin

  after_initialize :setup_user

  before_create :add_invites

  validates_presence_of :invitation_id, :username

  validates :username,
    :uniqueness => {
      :case_sensitive => false
    },
    :format => { :with => /^[A-Za-z0-9_.]{1,15}$/,
      message: "no spaces or dashes" }

  validate :token_must_be_present_for_social_sign_ins

  has_many :sent_invitations, :class_name => 'Invitation', :foreign_key => 'sender_id'
  belongs_to :invitation

  #creates a user from the auth information
  
  def self.from_omniauth(auth)
    where("#{auth.provider}_id".to_sym => auth.uid).first_or_create do |user|
      user["has_#{auth.provider}"] = true
      user["#{auth.provider}_id"] = auth.uid
      user.email = auth.info.email if auth.info.email
      user.token = auth.credentials.token
      user.token_secret = auth.credentials.secret if auth.credentials.secret
      user.username = auth.info.nickname
    end
  end

  #allows devise to create a new user from a session so that it can refresh the signup page in the event of an error

  def self.new_with_session(params, session)
    if session["devise.user_attributes"]
      new(session['devise.user_attributes'], without_protection: true) do |user|
        user.attributes = params
        user.valid?
      end
    else
      super
    end
  end

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
    where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
    where(conditions).first
    end
  end

  def has_social_account?
    has_facebook || has_twitter
  end

  #devise overrides for social sign on

  def password_required?
    super if !has_social_account?
  end

  def email_required?
    super if !has_social_account?
  end

  #allows users with social sign on to be edited without a password

  def update_with_password(params, *options)
    if encrypted_password.blank?
      update_attributes(params, *options)
    else
      super
    end
  end

   def remove_invite
    self.invitations_left -= 1
  end

  #beta methods

  def invitation_key
    invitation.beta_key if invitation
  end

  def invitation_key=(key)
    self.invitation = Invitation.find_by_beta_key(key)
  end

  private

  #upon creation, users social sign ons should be set to false if they don't exist
  def setup_user
    self.has_facebook = false unless self.has_facebook
    self.has_twitter = false unless self.has_twitter
  end

  #upon creation, user gets 5 beta invites
  def add_invites
    self.invitations_left = 5
  end

  #validates that users have oauth token if signed in through social
  def token_must_be_present_for_social_sign_ins
    if(has_social_account? && token.blank?)
      errors.add(:token, "Cannot be blank if you have a social account")
    end
  end
end