class Term
  include Mongoid::Document

  field :start, :type => Date
  field :end, :type => Date
  field :term_type, :type => String
  field :congress_numbers, :type => Array
  embedded_in :politician
end