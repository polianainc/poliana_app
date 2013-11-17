class BillsController < ApplicationController
  def show
    @bill = Bill.find(params[:id])
    binding.pry
  end

  def all
    @bills = Bill.all
  end
end