class PoliticiansController < ApplicationController
  before_filter :set_start_date

  def index
    @politicians = Politician.find_all_after(@date)
    respond_to do |format|
      format.html
      format.json { render :json => @politicians.to_json }
    end
  end

  private
    def set_start_date
      @date = Date.new(1996,1,23)
    end
end
