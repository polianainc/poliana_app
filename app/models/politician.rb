class Politician
  include Mongoid::Document

  field :first_name, :type => String
  field :last_name, :type => String
  field :party, :type => String
  field :bioguide_id, :type => String
  field :district, :type=> Integer
  field :birthday, :type=> Date

  embeds_many :terms
end