class SearchController < ApplicationController
  before_filter :authenticate_user!
  def search
    @search = {}

    if params[:fields] != nil
      fields = determine_search_type
      
      fields.each do |field|
        @search[field] = search_model(field)
      end
    end

    respond_to do |format|
      format.html { render :action => "search" }
      format.json { render :json => @search }
    end
  end

  private


  def search_model(model_name)
    page = params["#{model_name}_page"] ? params["#{model_name}_page"] : 1

    models = {}
    paging = {}

    s = model_name.capitalize.singularize.constantize.boosted_search(page, params[:query])

    models["data"]  = s.results

    paging["total"] = s.total
    paging["next"] = page.to_i + 1 unless models["data"].last_page?
    paging["previous"] = page.to_i - 1 unless models["data"].first_page?

    models["paging"] = paging

    return models
  end


  def determine_search_type
    valid_types = params[:fields].split(',').select{|f| valid_search_types.include?(f) }
  end

  def valid_search_types
    ["politicians"]
  end
end