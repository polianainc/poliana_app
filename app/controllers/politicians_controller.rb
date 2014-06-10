class PoliticiansController < ApplicationController
  before_filter :authenticate_user!

  def index
    @states = [
      {'name' => 'Alabama', 'abbrev' => 'AL'},
      {'name' => 'Alaska', 'abbrev' => 'AK'},
      {'name' => 'Arizona', 'abbrev' => 'AZ'},
      {'name' => 'Arkansas', 'abbrev' => 'AR'},
      {'name' => 'California', 'abbrev' => 'CA'},
      {'name' => 'Colorado', 'abbrev' => 'CO'},
      {'name' => 'Connecticut', 'abbrev' => 'CT'},
      {'name' => 'Delaware', 'abbrev' => 'DE'},
      {'name' => 'Florida', 'abbrev' => 'FL'},
      {'name' => 'Georgia', 'abbrev' => 'GA'},
      {'name' => 'Hawaii', 'abbrev' => 'HI'},
      {'name' => 'Idaho', 'abbrev' => 'ID'},
      {'name' => 'Illinois', 'abbrev' => 'IL'},
      {'name' => 'Indiana', 'abbrev' => 'IN'},
      {'name' => 'Iowa', 'abbrev' => 'IA'},
      {'name' => 'Kansas', 'abbrev' => 'KS'},
      {'name' => 'Kentucky', 'abbrev' => 'KY'},
      {'name' => 'Louisiana', 'abbrev' => 'LA'},
      {'name' => 'Maine', 'abbrev' => 'ME'},
      {'name' => 'Maryland', 'abbrev' => 'MD'},
      {'name' => 'Massachusetts', 'abbrev' => 'MA'},
      {'name' => 'Michigan', 'abbrev' => 'MI'},
      {'name' => 'Minnesota', 'abbrev' => 'MN'},
      {'name' => 'Mississippi', 'abbrev' => 'MS'},
      {'name' => 'Missouri', 'abbrev' => 'MO'},
      {'name' => 'Montana', 'abbrev' => 'MT'},
      {'name' => 'Nebraska', 'abbrev' => 'NE'},
      {'name' => 'Nevada', 'abbrev' => 'NV'},
      {'name' => 'New Hampshire', 'abbrev' => 'NH'},
      {'name' => 'New Jersey', 'abbrev' => 'NJ'},
      {'name' => 'New Mexico', 'abbrev' => 'NM'},
      {'name' => 'New York', 'abbrev' => 'NY'},
      {'name' => 'North Carolina', 'abbrev' => 'NC'},
      {'name' => 'North Dakota', 'abbrev' => 'ND'},
      {'name' => 'Ohio', 'abbrev' => 'OH'},
      {'name' => 'Oklahoma', 'abbrev' => 'OK'},
      {'name' => 'Oregon', 'abbrev' => 'OR'},
      {'name' => 'Pennsylvania', 'abbrev' => 'PA'},
      {'name' => 'Rhode Island', 'abbrev' => 'RI'},
      {'name' => 'South Carolina', 'abbrev' => 'SC'},
      {'name' => 'South Dakota', 'abbrev' => 'SD'},
      {'name' => 'Tennessee', 'abbrev' => 'TN'},
      {'name' => 'Texas', 'abbrev' => 'TX'},
      {'name' => 'Utah', 'abbrev' => 'UT'},
      {'name' => 'Vermont', 'abbrev' => 'VT'},
      {'name' => 'Virginia', 'abbrev' => 'VA'},
      {'name' => 'Washington', 'abbrev' => 'WA'},
      {'name' => 'West Virginia', 'abbrev' => 'WV'},
      {'name' => 'Wisconsin', 'abbrev' => 'WI'},
      {'name' => 'Wyoming', 'abbrev' => 'WY'}
    ]

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
