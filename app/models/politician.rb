class Politician
  include Mongoid::Document

  field :first_name, :type => String
  field :last_name, :type => String
  field :party, :type => String
  field :district, :type=> Integer
  field :birthday, :type=> Date

  embeds_many :terms
  index "terms.term_start" => 1

  def self.find_all_after(date)
    where("terms.term_start" => { "$gte" => date })
  end
end