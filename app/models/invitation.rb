require 'bcrypt'
class Invitation < ActiveRecord::Base
  include BCrypt

  belongs_to :sender, :class_name => 'User'
  has_one :recipient, :class_name => 'User'

  validates_presence_of :recipient_email

  before_create :recipient_not_signed_up
  before_create :generate_key

  validate :sender_has_invitations, :if => :sender

  attr_accessible :beta_key, :recipient_email, :sender_id, :as => [:default, :admin]

  private

  def recipient_not_signed_up
    errors.add :recipient_email, 'is already registered' if User.find_by_email(recipient_email)
  end

  def sender_has_invitations
    unless sender.invitations_left > 0
        errors.add(:base, "You have ran out of invitations, email us for more!")
    end
  end

  def generate_key
    self.beta_key = Digest::MD5.hexdigest(Engine.generate_salt + Time.now.to_s)
  end
end