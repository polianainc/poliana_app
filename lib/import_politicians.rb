def import_raw_legislators_to_mongo
  
  json = File.read('lib/assets/legislators.json')
  legislators = JSON.parse(json)

  legislators.each do |pol|
    if pol["bioguide_id"] == nil
      puts pol["first_name"] + " " + pol["last_name"] 
      next
    end

    mpol = Politician.find(pol["bioguide_id"])

    if !mpol
      mpol = Politician.new()
      mpol.id = pol["bioguide_id"]
    end

    mpol.first_name ||= pol["first_name"]
    mpol.last_name ||= pol["last_name"]
    
    mpol.party ||= pol["party"]
    mpol.district ||= pol["district"]

    mpol.birthday ||= Date.strptime(pol["birthday"], "%Y-%m-%d") if pol["birthday"]

    term = Term.new()
    term.term_type = pol["term_type"]
    term.term_start = DateTime.strptime((pol["begin_timestamp"]).to_s, '%s').to_date
    term.term_end = DateTime.strptime((pol["end_timestamp"]).to_s, '%s').to_date

    mpol.terms << term

    mpol.save()
  end
end

import_raw_legislators_to_mongo()