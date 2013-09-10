class InvitationsController < ApplicationController
    def new
        @invitation = Invitation.new
    end

    def create
        @invitation = Invitation.new(params[:invitation])
        @invitation.sender = current_user
        
    end
end