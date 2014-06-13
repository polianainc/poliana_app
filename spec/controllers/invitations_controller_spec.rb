require 'spec_helper'

# def setup_invitation_attrs
#   @invitation_attrs = FactoryGirl.attributes_for(:invitation)
# end

# describe InvitationsController do
#   login_user

#   it "should have current user" do
#     subject.current_user.should_not be_nil
#   end

#   describe "POST create" do
#     before(:each) do
#       setup_invitation_attrs
#     end

#     context "with a valid invitation" do
#         it "should create a new invitation" do
#           expect {
#               post :create, :invitation => @invitation_attrs
#             }.to change(Invitation, :count).by(1)
#         end

#         it "should decrement the current users' invitation count" do
#           expect {
#             post :create, :invitation => @invitation_attrs
#           }.to change(subject.current_user, :invitations_left).by(-1)
#         end

#       end
#     end

# end
