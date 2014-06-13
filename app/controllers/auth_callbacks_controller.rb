class AuthCallbacksController < Devise::OmniauthCallbacksController

    def all
        user = User.from_omniauth(request.env['omniauth.auth'])

        if user.save
            flash[:notice] = "Success!"
            sign_in_and_redirect user, notice: "Success!"
        end
    end

    alias_method :facebook, :all
    alias_method :twitter, :all
end
