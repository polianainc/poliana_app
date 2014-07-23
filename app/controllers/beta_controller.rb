require 'services/track_events.rb'

class BetaController < Devise::RegistrationsController
    def new
        build_resource({})
        respond_with self.resource
    end

    def create
        build_resource(params[:user])
        if resource.save
            flash[:notice] = "Signed up! Welcome to Poliana."
            sign_up(resource_name, resource)
            redirect_to root_url
        else
            clean_up_passwords(resource)
            respond_with resource
        end
    end
end
