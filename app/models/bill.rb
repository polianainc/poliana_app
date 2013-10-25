class Bill
  include Mongoid::Document
  store_in collection: "bills"

  field :topSubject, :type => String
  field :popularTitle, :type => String
  field :shortTitle, :type => String
  field :subjects, :type => Array
  field :officialTitle, :type => String

  include Sunspot::Mongo
  searchable do
    text :popularTitle
    text :shortTitle
    text :topSubject
    text :subjects
    text :officialTitle
  end
end