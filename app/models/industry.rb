class Industry
  include Mongoid::Document
  store_in collection: "industries"

  field :name, :type => String
  field :industry, :type => String
  field :sector_long, :type => String

  include Sunspot::Mongoid2
  searchable do
    text :name
    text :industry
    text :sector_long
  end
end