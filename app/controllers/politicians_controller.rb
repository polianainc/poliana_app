class PoliticiansController < ApplicationController

  def index
    @states = states

    @politicians = Politician.all

    @politicians = @politicians.where(:state => params[:state]) if params[:state].present?
    @politicians = @politicians.any_in(:party => params[:party].split(',')) if params[:party].present?
    @politicians = @politicians.where(:gender => params[:gender]) if params[:gender].present?
    @politicians = @politicians.any_in(:general_religion => params[:religion].split(',')) if params[:religion].present?

    # Ideally refactor these two n^2 loops into one...
    # Originally this was the case, but it wasn't filtering correctly

    if params[:congress].present?
      found = []

      congress = params.fetch(:congress, 0).to_i

      @politicians.each do |politician|
        politician.terms.each do |term|
          if term.congresses.include? congress
            found.push(politician)
            break
          end
        end
      end

      @politicians = found
    end

    if params[:type].present?
      found = []

      type = params.fetch(:type, "").split(',')

      @politicians.each do |politician|
        politician.terms.each do |term|
          if type.include? term.term_type
            found.push(politician)
            break
          end
        end
      end

      @politicians = found
    end

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
      wiki_noko = Nokogiri::HTML(wiki.sanitized_content)
      @wikipedia_bio = wiki_noko.search('p').first
    else
      @wikipedia_bio = nil
    end
  end
end
