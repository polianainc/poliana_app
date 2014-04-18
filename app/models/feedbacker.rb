class Feedbacker < ActiveRecord::Base
  attr_accessible :description, :email, :image, :link, :name
  validates :name, :email, :description, presence: true
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, on: :create }
  mount_uploader :image, ImageUploader
end
