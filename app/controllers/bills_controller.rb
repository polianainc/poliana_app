class BillsController < ApplicationController
  def show
    @bill = Bill.find(params[:id])
  end

  def all
    @bills = Bill.all
  end
end