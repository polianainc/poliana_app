class BillsController < ApplicationController
  def show
    mongoId = Bill.find_by :billId => params[:billId]
    @bill = Bill.find_with_nested_fields(mongoId._id)
   
    respond_to do |format|
      format.html { render :action => "show" }
      format.json { render :json => @bill }
    end
  end

  def all
    @bills = Bill.all
  end
end