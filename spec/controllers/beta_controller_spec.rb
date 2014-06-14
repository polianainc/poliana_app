require 'spec_helper'

def setup_user_attrs
  @user_attrs = FactoryGirl.attributes_for(:user)
end

describe BetaController do
  before { @request.env["devise.mapping"] = Devise.mappings[:user] }

  describe "GET new" do
    it "should initialize a user" do
      
      user = User.new()
      get :new
      
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
end
