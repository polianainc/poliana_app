require 'spec_helper'

describe SearchController do
  context "when logged in" do
      login_user

    describe "Politician only search" do
      it "performs a search on the politician" do
        get :search, {:query => "Barack", :fields => "politicians"}
        Sunspot.session.should be_a_search_for(Politician)
      end

      it "should paginate correctly" do
        get :search, { :query => "Democrat", :fields => "politicians", :politicians_page => 2 }
        Sunspot.session.should have_search_params(:paginate, :page => 2, :per_page => 10)
      end
    end
  end


  context "when not logged in" do
    it "should not search" do
      get :search
      # It should redirect us
      response.status.should eq 302
    end
  end

end
