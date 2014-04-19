class AuthCallbacksController < Devise::OmniauthCallbacksController

    def all
        user = User.from_omniauth(request.env['omniauth.auth'])
        user.invitation_key ||= session[:invitation_key]

        if user.save
            sign_in_and_redirect user, notice: "Success!"
        else
            flash[:alert] = "You don't have an invitation code yet. Sign up for the beta, and we'll send you one when we're ready!"
            redirect_to root_url
        end
    end

    alias_method :facebook, :all
    alias_method :twitter, :all
end
