class User < ActiveRecord::Base

    devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable

    attr_accessible :email, :password, :password_confirmation, :remember_me, :invitation_id

    after_initialize :setup_user

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
            user.token_secret = auth.credentials.token_secret
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

    #devise overrides for social sign on

    def has_social_account?
        has_facebook || has_twitter
    end

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

    #beta methods

    def invitation_key
        invitation.beta_key if invitation
    end

    def invitation_key=(key)
        self.invitation = Invitation.find_by_beta_key(key)
    end

    private

    #callback for User.new

    def setup_user
        #upon creation, user cannot have social sign on
        has_facebook = false
        has_twitter = false
        #upon creation, user gets 5 beta invites
        invitations_left = 5
    end

    def token_must_be_present_for_social_sign_ins
        if(has_social_account? && token.blank?)
            errors.add(:token, "Cannot be blank if you have a social account")
        end
    end
end