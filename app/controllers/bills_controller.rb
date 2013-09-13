class BillsController < ApplicationController
    respond_to :json

    def metadata
        respond_with @bill = Bill.find(params[:id])
    end 

    def cache
        @data = MongoWrapper.collection.find("_id" => BSON::ObjectId(params[:id])).to_a.first
        respond_with @data
    end

    def index
        binding.pry
        @bills = Bill.all
    end

    def scrape_congress

    end

end