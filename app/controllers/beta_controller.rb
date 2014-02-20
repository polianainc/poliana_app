require 'services/track_events.rb'

class BetaController < Devise::RegistrationsController
    def new
        build_resource({})
        
        resource.invitation_key = params[:key]

        #stores the beta key in a session in case they use social sign in
        session[:invitation_key] = params[:key]
        resource.email = resource.invitation.recipient_email if resource.invitation
        respond_with self.resource
    end

    def create
        build_resource(params[:user])
        session.delete(:invitation_key)
        resource.invitation.save if resource.invitation
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
