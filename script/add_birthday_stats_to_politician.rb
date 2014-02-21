count = Politician.count.to_f
Politician.order_by([:birthday, :asc]).each_with_index do |pol, i|
  fi = i.to_f

  calc = ((i+1.0)/count) - 0.5
  pol.percent_age_difference = (calc*100).to_i
  puts pol.percent_age_difference
end