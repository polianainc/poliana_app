class BillsController < ApplicationController
  def show
   @bill = Bill.find_with_nested_fields(params[:id])
   
   respond_to do |format|
     format.html { render :action => "show" }
     format.json { render :json => @bill }
   end
  end

  def all
    @bills = Bill.all
  end
end