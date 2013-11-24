class SearchController < ApplicationController
  def search
    @search = {}

    if params[:fields] != nil
      fields = params[:fields].split(",")
    
      if fields.include? "bills"
        @search["bills"] = searchBills(params)
      end
      
      if fields.include? "politicians"
        @search["politicians"] = searchPoliticians(params)
      end

      if fields.include? "industries"
        @search["industries"] = searchIndustries(params)
      end
    end

    respond_to do |format|
      format.html { render :action => "search" }
      format.json { render :json => @search }
    end
  end

  def searchBills(params)
    page = params["bill_page"] ? params["bill_page"] : 1

    @bills = {}
    paging = {}

    s = Bill.search do 
      fulltext params[:query] do
        boost_fields :popularTitle => 3.0
        boost_fields :shortTitle => 2.5
        boost_fields :topSubject => 2.0
        boost_fields :subjects => 1.5
      end

      paginate :page => page, :per_page => 10
      order_by(:score, :desc)
    end

    @bills["data"] = s.results

    paging["total"] = s.total
    paging["next"] = page.to_i + 1 unless @bills["data"].last_page?
    paging["previous"] = page.to_i - 1 unless @bills["data"].first_page?

    @bills["paging"] = paging

    return @bills
  end

  def searchIndustries(params)
    page = params["industry_page"] ? params["industry_page"] : 1

    @industries = {}
    paging = {}

    s = Industry.search do 
      fulltext params[:query] do
        boost_fields :name => 2.5
        boost_fields :industry => 1.75
        boost_fields :sector_long => 1.0
      end

      paginate :page => page, :per_page => 10
      order_by(:score, :desc)
    end

    @industries["data"] = s.results

    paging["total"] = s.total
    paging["next"] = page.to_i + 1 unless @industries["data"].last_page?
    paging["previous"] = page.to_i - 1 unless @industries["data"].first_page?

    @industries["paging"] = paging

    return @industries
  end

  def searchPoliticians(params)
    #stub
  end

end