class BillsController < ApplicationController
    def metadata
        @bill = Bill.find(params[:id])
    end 

    def cache
        # @data = collection.find("_id" => params[:id])
        binding.pry
    end

    def index
        @bills = Bill.all
    end

    def scrape_congress
    end

end