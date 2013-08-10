require "congress_helper"
require 'congress'
include CongressHelper
class BillsController < ApplicationController
    def metadata
        @bill = Bill.find(params[:id])
    end 

    def cache
        @data = collection.find("_id" => params[:id])
    end

    def index
        @bills = Bill.all
    end

    def scrape_congress
        binding.pry     
    end

end