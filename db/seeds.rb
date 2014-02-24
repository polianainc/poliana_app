admins = ["patrick@poliana.com", "grayson@poliana.com", "david@poliana.com", "jay@poliana.com", "shawn@poliana.com"]

admins.each do |u_email|
  i = Invitation.create(:recipient_email => u_email)
  User.create(:email => u_email,
    :password => "changemequick",
    :password_confirmation => "changemequick",
    :invitation_key => i.beta_key,
    :username => u_email.split("@")[0],
  )
end
