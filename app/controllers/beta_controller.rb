class BetaController < Devise::RegistrationsController
    def new
        build_resource({})
        resource.invitation_key = params[:key]
        resource.email = resource.invitation.recipient_email if resource.invitation
        respond_with self.resource
    end

    def create
        build_resource(params[:user])
        resource.invitation.save
        if resource.save
            set_flash_message :notice, :signed_up if is_navigational_format?
            sign_up(resource_name, resource)
            redirect_to root_url
        else
            clean_up_passwords(resource)
            respond_with resource
        end
    end
end
