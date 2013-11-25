class IndustriesController < ApplicationController
  def show
    @industry = Industry.find_with_nested_fields(params[:id])

    respond_to do |format|
      format.html { render :action => "show" }
      format.json { render :json => @industry }
    end
  end

  def all
    @industries = Industry.all
  end
end