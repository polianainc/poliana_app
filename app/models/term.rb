class Term
  include Mongoid::Document

  field :term_start, :type => Date
  field :term_end, :type => Date
  field :term_type, :type => String
  embedded_in :politician
end