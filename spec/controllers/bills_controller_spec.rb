require 'spec_helper'

describe BillsController do

  describe "GET 'show'" do
    it "returns http success" do
      get 'show'
      response.should be_success
    end
  end

  describe "GET 'all'" do
    it "returns http success" do
      get 'all'
      response.should be_success
    end
  end

end
