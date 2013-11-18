require 'sunspot_mongoid2'
class Bill
  include Mongoid::Document
  store_in collection: "bills"

  field :topSubject, :type => String
  field :popularTitle, :type => String
  field :shortTitle, :type => String
  field :subjects, :type => Array
  field :officialTitle, :type => String
  has_many :legislators
  include Sunspot::Mongoid2
  searchable do
    text :popularTitle
    text :shortTitle
    text :topSubject
    text :subjects
    text :officialTitle
  end


  def self.find_with_nested_fields(id)
    bill = Bill.find(id)
    bill[:vote] = Vote.find_with_nested_fields(bill.votes["$id"])
    binding.pry
    bill.sponsor = Legislator.find(bill.sponsor["$id"])
    cosponsor_ids = bill.cosponsors.map { |l| l["$id"]  }
    bill.cosponsors = Legislator.find(cosponsor_ids)
    return bill
  end
end