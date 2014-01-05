class SearchController < ApplicationController
  def search
    @search = {}

    if params[:fields] != nil
      fields = params[:fields].split(",")
      
      if fields.include? "politicians"
        @search["politicians"] = searchPoliticians(params)
      end
    end

    respond_to do |format|
      format.html { render :action => "search" }
      format.json { render :json => @search }
    end
  end

  def searchPoliticians(params)
    #stub
  end

end