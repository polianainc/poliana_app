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
  
  def self.get_image(bioguide_id)
    return "https://s3.amazonaws.com/poliana.media/web/" + bioguide_id + ".png"
  end

# HACK - these values are manually calculated to reduce storage on the database level.
  def percent_gender
    return 83.226 if gender == "M"
    return 16.774 if gender == "F"
    return nil
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
end