class IndustryMonthlyTotal
  include Mongoid::Document
  store_in collection: "industry_monthly_totals"
end