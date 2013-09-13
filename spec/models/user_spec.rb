require 'spec_helper'

describe User do
    before do
        @user = User.new( email: "test@example.com", password: "test1234", password_confirmation: "test1234", remember_me: false)
        auth = {
            "provider"=>"twitter",
            "uid"=>"1455771446",
            "info"=> OpenStruct.new({ "email" => "test@example.com" }),
             "credentials"=>  OpenStruct.new({
                    "token"=>"1455771446-0ZelUpnCqM2qvoBZpN8x4rgLjWttGWsP9q33mXk",
                    "secret"=>"EyaPXjTA07rjHh58BgjmREOHKGeEUbPiMFgLmglMc"
            })
        }
        @auth = OpenStruct.new(auth)
    end

    subject { @user }

    it { should respond_to(:email) }
    it { should be_valid }

    describe "after saving" do
        before do
            @user.save
        end

        it "should have invitation id" do
            @user.invitation_id.should_not be_nil
        end
    end

    describe "when email is not present and they don't have social accounts" do
        before { @user.email = "" }
        it { should_not be_valid }
    end

    describe "when password is not present and they don't have social accounts" do
        before { @user.password = "" }
        it { should_not be_valid }
    end

    describe "when a social account" do
        before do
            @user = User.from_omniauth(@auth)
        end

        it "should not require email or password to be valid" do
            @user.email = ""
            @user.password = ""
            @user.password_confirmation = ""
            @user.should be_valid
        end

        it "should not be valid without an oauth token" do
            @user.token = ""
            @user.token_secret = ""
            @user.should_not be_valid
        end
    end
end