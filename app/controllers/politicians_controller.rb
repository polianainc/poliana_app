class PoliticiansController < ApplicationController

  def index
    @politicians = Politician.find_all_after(@date).all
    respond_to do |format|
      format.html
      format.json { render :json => @politicians.to_json }
    end
  end

  def show
    @politician = Politician.where(:bioguide_id => params[:id].upcase).first
  end
end
