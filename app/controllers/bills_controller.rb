class BillsController < ApplicationController
  def show
   @bill = Bill.find_with_nested_fields(params[:id])
  end

  def all
    @bills = Bill.all
  end
end