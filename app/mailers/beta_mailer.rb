class BetaMailer < ActionMailer::Base
  default from: "invite@poliana.com"

  def invitation(invitation, signup_url)
		subject   'Poliana Beta Invitation'
    recipients invitation.recipient_email
    body  :invitation => invitation, :signup_url => signup_url
    invitation.update_attribute(:sent_at, Time.now)
  end

  def invitation(invitation, signup_url)
    @invitation = invitation
    @signup_url = signup_url
    mail(:to => @invitation.recipient_email, :subject => 'Poliana Beta Invitation')
  end

end
