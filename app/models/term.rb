class Term
  include Mongoid::Document

  field :start, :type => Date
  field :end, :type => Date
  field :term_type, :type => String
  field :congress, :type => Integer
  embedded_in :politician
end