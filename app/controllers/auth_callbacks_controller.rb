class AuthCallbacksController < Devise::OmniauthCallbacksController

    def all
        user = User.from_omniauth(request.env['omniauth.auth'])
        user.invitation_key ||= session[:invitation_key]
        if user.save
            sign_in_and_redirect user, notice: "Success!"
        else
            session["device.user_attributes"] = user.attributes
            redirect_to new_user_registration_url
        end
    end

    alias_method :twitter, :all
    alias_method :facebook, :all
end