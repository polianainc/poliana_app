require 'services/track_events.rb'

class BetaController < Devise::RegistrationsController
    def new
        build_resource({})
        respond_with self.resource
    end

    def create
        build_resource(params[:user])

        if resource.save
            set_flash_message :notice, :signed_up if is_navigational_format?
            sign_up(resource_name, resource)
            TracksEvents.track_sign_up(cookies)
            redirect_to root_url
        else
            clean_up_passwords(resource)
            respond_with resource
        end
    end
end
