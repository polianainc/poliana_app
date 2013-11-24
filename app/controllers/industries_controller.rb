class IndustriesController < ApplicationController
  def show
    @industry = Industry.find(params[:id])

    respond_to do |format|
      format.html { render :action => "show" }
      format.json { render :json => @industry }
    end
  end

  def all
    @bills = Bill.all
  end
end