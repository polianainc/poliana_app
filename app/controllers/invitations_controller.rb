class InvitationsController < ApplicationController
	before_filter :authenticate_user!

	def new
		@invitation = Invitation.new
	end

	def create
		@invitation = Invitation.new(params[:invitation])
		@invitation.sender = current_user
		if @invitation.save
			if user_signed_in?
				BetaMailer.invitation(@invitation, beta_signup_url(@invitation.beta_key)).deliver
				flash[:notice] = "Thanks for sharing! The invitation just went out."

        gabba = Gabba::Gabba.new("UA-42980806-1", "poliana.com")
        gabba.event("Invitations", "Sent", "", current_user.invitations_left.to_s, true)

				current_user.remove_invite
				redirect_to root_url
			end
		else
			render :action => 'new'
		end
	end
end
