class PoliticiansController < ApplicationController
  before_filter :authenticate_user!

  def index
    @politicians = Politician.all
    respond_to do |format|
      format.html
      format.json { render :json => @politicians.to_json }
    end
  end

  def show
    @politician = Politician.where(:bioguide_id => params[:id].upcase).first
  end
end
