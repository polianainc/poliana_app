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

  def self.find_with_nested_fields(id)
    industry = Industry.find(id)
    industry[:monthly_total] = IndustryMonthlyTotal.find_by(:industry => id.to_s)
    binding.pry
    return industry
  end
end