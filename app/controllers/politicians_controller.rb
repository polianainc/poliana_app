class PoliticiansController < ApplicationController
  before_filter :authenticate_user!

  def index
    @politicians = Politician.all
    respond_to do |format|
      format.html
      format.json { render :json => @politicians.to_json }
    end
  end

  def show
    require 'wikipedia'
    
    @politician = Politician.where(:bioguide_id => params[:id].upcase).first

    wiki = Wikipedia.find(@politician.first_name + " " + @politician.last_name)
    if wiki.templates.first != "Template:Category handler"
      wikiNoko = Nokogiri::HTML(wiki.sanitized_content)
      @wikipediaBio = wikiNoko.search('p').first
    else
      @wikipediaBio = nil
    end
  end
end
