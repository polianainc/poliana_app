require 'sunspot_mongoid2'

class Politician
  include Mongoid::Document

  field :first_name, :type => String
  field :last_name, :type => String
  field :party, :type => String
  field :district, :type => Integer
  field :birthday, :type => Date
  field :bioguide_id, :type => String
  field :gender, :type => String
  field :religion, :type => String
  field :state, :type => String
  field :percent_age_difference, :type => Float
  field :image_url, :type => String
  embeds_many :terms
  accepts_nested_attributes_for :terms

  index "terms.term_start" => 1
  index :bioguide_id => 1

  include Sunspot::Mongoid2
  searchable do
    text :first_name
    text :last_name
    text :party
  end

  def self.boosted_search(page, query, num = 10)
    self.search do 
       fulltext query do
        boost_fields :last_name => 3.0
        boost_fields :first_name => 2.5
        boost_fields :party => 2.0
      end

      paginate :page => page, :per_page => num
      order_by(:score, :desc)
    end
  end
  
  def full_name
    return first_name + " " + last_name
  end

  # HACK - these values are manually calculated to reduce storage on the database level.
  def percent_gender
    return 83.226 if gender == "M"
    return 16.774 if gender == "F"
    return nil
  end
  
  def age
    now = Time.now.utc.to_date
    now.year - birthday.year - ((now.month > birthday.month || (now.month == birthday.month && now.day >= birthday.day)) ? 0 : 1)
  end
  
  def general_religion
    #"Protestant", "Episcopalian", "Lutheran", "Baptist", "Jewish", "Methodist", "Presbyterian", "Roman Catholic", "Christian", "African Methodist Episcopal", "Catholic", "Latter Day Saints", "Congregationalist", "First Christian Church (Disciples of Christ)", "United Brethren in Christ", "Greek Orthodox", "Unitarian Universalist", "Assembly of God", "United Church of Christ", "Unitarian", "Seventh-Day Adventist", "Christian Scientist", "Second Baptist", "United Methodist", "Southern Baptist", "Christian Reformed", "Reformed Church in America", "Reformed Latter Day Saint", "Moravian", "Unknown", "Seventh Day Adventist", "Nazarene", "Episcopal", "Church of Christ"
    
    if religion == "Jewish"
      return "Jewish"
    elsif religion == "Unitarian Universalist" || religion == "Unitarian"
      return "Other/Non-religious"
    elsif religion == "Muslim"
      return "Muslim"
    elsif religion != "" and religion != nil
      return "Christian"
    end
    
    return nil
  end

  def self.role(term)
    if term == "prez"
      return "President"
    elsif term == "viceprez"
      return "Vice President"
    elsif term == "sen"
      return "Senator"
    elsif term == "rep"
      return "Representative"
    else
      return "Pre-election"
    end
  end
  
  def self.pronoun(gender)
    if !gender.nil?
      if gender == "M"
        return "his"
      else
        return "her"
      end
    end
    
    return "their"
  end
  
  def self.gender(gender)
    if gender == "M"
      return "Male"
    else
      return "Female"
    end
  end
  
  def self.state(state)
    states = [{name: 'Alabama', abbrev: 'AL'},{name: 'Alaska', abbrev: 'AK'},{name: 'Arizona', abbrev: 'AZ'},{name: 'Arkansas', abbrev: 'AR'},{name: 'California', abbrev: 'CA'},{name: 'Colorado', abbrev: 'CO'},{name: 'Connecticut', abbrev: 'CT'},{name: 'Delaware', abbrev: 'DE'},{name: 'Florida', abbrev: 'FL'},{name: 'Georgia', abbrev: 'GA'},{name: 'Hawaii', abbrev: 'HI'},{name: 'Idaho', abbrev: 'ID'},{name: 'Illinois', abbrev: 'IL'},{name: 'Indiana', abbrev: 'IN'},{name: 'Iowa', abbrev: 'IA'},{name: 'Kansas', abbrev: 'KS'},{name: 'Kentucky', abbrev: 'KY'},{name: 'Louisiana', abbrev: 'LA'},{name: 'Maine', abbrev: 'ME'},{name: 'Maryland', abbrev: 'MD'},{name: 'Massachusetts', abbrev: 'MA'},{name: 'Michigan', abbrev: 'MI'},{name: 'Minnesota', abbrev: 'MN'},{name: 'Mississippi', abbrev: 'MS'},{name: 'Missouri', abbrev: 'MO'},{name: 'Montana', abbrev: 'MT'},{name: 'Nebraska', abbrev: 'NE'},{name: 'Nevada', abbrev: 'NV'},{name: 'New Hampshire', abbrev: 'NH'},{name: 'New Jersey', abbrev: 'NJ'},{name: 'New Mexico', abbrev: 'NM'},{name: 'New York', abbrev: 'NY'},{name: 'North Carolina', abbrev: 'NC'},{name: 'North Dakota', abbrev: 'ND'},{name: 'Ohio', abbrev: 'OH'},{name: 'Oklahoma', abbrev: 'OK'},{name: 'Oregon', abbrev: 'OR'},{name: 'Pennsylvania', abbrev: 'PA'},{name: 'Puerto Rico', abbrev: 'PR'},{name: 'Rhode Island', abbrev: 'RI'},{name: 'South Carolina', abbrev: 'SC'},{name: 'South Dakota', abbrev: 'SD'},{name: 'Tennessee', abbrev: 'TN'},{name: 'Texas', abbrev: 'TX'},{name: 'Utah', abbrev: 'UT'},{name: 'Vermont', abbrev: 'VT'},{name: 'Virginia', abbrev: 'VA'},{name: 'Washington', abbrev: 'WA'},{name: 'West Virginia', abbrev: 'WV'},{name: 'Wisconsin', abbrev: 'WI'},{name: 'Wyoming', abbrev: 'WY'}]
  		
  	states.each do |s|
  	  if state == s[:name]
  	    return s[:abbrev]
	    elsif state == s[:abbrev]
	      return s[:name]
      end
	  end
	  
	  return nil
  end

  def self.party(party)
    if party == "D" || party == "R" || party == "I"
      if party == "D"
        return "Democrat"
      elsif party == "R"
        return "Republican"
      else
        return "Independent"
      end
    else
      if party == "Democrat" || party == "Popular Democrat"
        return "D"
      elsif party == "Republican"
        return "R"
      else
        return "I"
      end
    end
  end
end