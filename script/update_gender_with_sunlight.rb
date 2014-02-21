require 'congress'
Congress.key = "d6ebd51a06bc41f58b3d56b981b9b9f6"

Politician.where(:gender => nil).each do |pol|
  sun_pol = Congress.legislators(:bioguide_id => pol.bioguide_id,
    "fields"=>"gender").results[0]

  pol.gender = sun_pol["gender"] if sun_pol && sun_pol["gender"]
  pol.save()
end