class Legislator
  include Mongoid::Document
  store_in collection: "legislators"
end