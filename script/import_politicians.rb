def import_raw_legislators_to_mongo
  
  json = File.read('lib/assets/legislators.json')
  legislators = JSON.parse(json)
  start_date = Date.new(2003, 1, 1)

  legislators.each do |pol|

    if pol["bioguide_id"] == nil
      puts pol["first_name"] + " " + pol["last_name"] 
      next
    end

    term_start = DateTime.strptime((pol["begin_timestamp"]).to_s, '%s').to_date
    if term_start < start_date
      next
    end

    mpol = Politician.where(:bioguide_id => pol["bioguide_id"])[0]

    if !mpol
      mpol = Politician.new()
      mpol.bioguide_id = pol["bioguide_id"]
    end

    mpol.first_name ||= pol["first_name"]
    mpol.last_name ||= pol["last_name"]
    
    mpol.party ||= pol["party"]
    mpol.district ||= pol["district"]

    mpol.birthday ||= Date.strptime(pol["birthday"], "%Y-%m-%d") if pol["birthday"]

    mpol.gender =  pol["gender"] if pol["gender"]
    mpol.religion =  pol["religion"] if pol["religion"]

    term = Term.new()
    term.term_type = pol["term_type"]
    term.start = term_start
    term.end = DateTime.strptime((pol["end_timestamp"]).to_s, '%s').to_date

    term.congress = (term.start.year - 1787) / 2;

    mpol.terms << term

    mpol.save()
  end
end

import_raw_legislators_to_mongo()