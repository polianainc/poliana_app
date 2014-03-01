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

  def self.boosted_search(page, query)
    self.search do 
       fulltext query do
        boost_fields :last_name => 3.0
        boost_fields :first_name => 2.5
        boost_fields :party => 2.0
      end

      paginate :page => page, :per_page => 10
      order_by(:score, :desc)
    end
  end

  def get_image
    uri = URI("https://s3.amazonaws.com/poliana.media/web/" + bioguide_id + ".png")

    request = Net::HTTP.new uri.host
    response = request.request_head uri.path
    
    if response.code.to_i == 200
      return uri
    else
      if gender == "M"
        return "male.png"
      else
        return "female.png"
      end
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
    else
      return "Christian"
    end
  end

  def self.role(term)
    if term == "prez"
      return "President"
    elsif term == "sen"
      return "Senator"
    elsif term == "rep"
      return "Representative"
    else
      return "Pre-election"
    end
  end
  
  def self.gender(gender)
    if gender == "M"
      return "Male"
    else
      return "Female"
    end
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
      if party == "Democrat" || party = "Popular Democrat"
        return "D"
      elsif party == "Republican"
        return "R"
      else
        return "I"
      end
    end
  end
end
