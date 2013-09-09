class User < ActiveRecord::Base
    # Include default devise modules. Others available are:
    # :token_authenticatable, :confirmable,
    # :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable

    # Setup accessible (or protected) attributes for your model
    attr_accessible :email, :password, :password_confirmation, :remember_me

    # attr_accessible :title, :body

    def self.from_omniauth(auth)
        binding.pry
        where("#{auth.provider}_id".to_sym => auth.uid).first_or_create do |user|
            user["has_#{auth.provider}"] = true
            user["#{auth.provider}_id"] = auth.uid
            user.email = auth.info.email
            user.token = auth.credentials.token
            user.token_secret = auth.credentials.token_secret
        end
    end

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

    def has_social_account?
        has_facebook || has_twitter
    end

    def password_required?
        super if !has_social_account?
    end

    def email_required?
        super if !has_social_account?
    end

    def update_with_password(params, *options)
        if encrypted_password.blank?
            update_attributes(params, *options)
        else
            super
        end
    end
end