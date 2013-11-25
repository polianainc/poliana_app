class IndustriesController < ApplicationController
  def show
    mongoId = Industry.find_by :industry_id => params[:industry_id]
    @industry = Industry.find_with_nested_fields(mongoId._id)

    respond_to do |format|
      format.html { render :action => "show" }
      format.json { render :json => @industry }
    end
  end

  def all
    @industries = Industry.all
  end
end