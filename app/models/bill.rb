class Bill
  include Mongoid::Document
  store_in collection: "bills"

  field :topSubject, :type => String
  field :popularTitle, :type => String
  field :shortTitle, :type => String
  field :subjects, :type => Array

  
end