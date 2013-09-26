require 'spec_helper'

def setup_user_attrs
  invitation = FactoryGirl.create(:invitation)
  @user_attrs = FactoryGirl.attributes_for(:user)
  @user_attrs[:invitation_key] = invitation.beta_key
end

describe BetaController do
  before { @request.env["devise.mapping"] = Devise.mappings[:user] }

  describe "GET new" do
    it "should initialize a user when you pass it a key" do
      
      invitation = FactoryGirl.create(:invitation)
      user = User.new(email: "test200@example.com", invitation_key: invitation.beta_key)
      get :new, :key => invitation.beta_key

      response.should be_success
      assigns(:user).attributes.should eq(user.attributes)
    end  
  end

  describe "POST create" do
    before(:each) do
      setup_user_attrs
    end

    context "with a valid beta key" do
        it "should create a user and sign them in" do
          expect {
              post :create, :user => @user_attrs
            }.to change(User, :count).by(1)
        end
      end
    end

    context "without a valid beta key" do
      before do
        setup_user_attrs
        @user_attrs[:invitation_key] = "bad_key" 
      end
      it "should not create a user" do
          expect {
              post :create, :user => @user_attrs
            }.to_not change(User, :count)
        end
    end
end
