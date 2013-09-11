class InvitationsController < ApplicationController
    def new
        @invitation = Invitation.new
    end

    def create
        @invitation = Invitation.new(params[:invitation])
        @invitation.sender = current_user
        if @invitation.save
            if user_signed_in?
                #send invitation                
            end
        else
            render :action => 'new'
        end
    end
end