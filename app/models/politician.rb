require 'sunspot_mongoid2'

class Politician
  include Mongoid::Document

  field :first_name, :type => String
  field :last_name, :type => String
  field :party, :type => String
  field :district, :type=> Integer
  field :birthday, :type=> Date

  embeds_many :terms

  index "terms.term_start" => 1

  include Sunspot::Mongoid2
  searchable do
    text :first_name
    text :last_name
    text :party
  end

  def self.boosted_search(page, query)
    
    self.search do 
       fulltext query do
        boost_fields :popularTitle => 3.0
        boost_fields :shortTitle => 2.5
        boost_fields :topSubject => 2.0
        boost_fields :subjects => 1.5
      end

      paginate :page => page, :per_page => 10
      order_by(:score, :desc)
    end
  end

  def self.find_all_after(date)
    where("terms.term_start" => { "$gte" => date })
  end
end