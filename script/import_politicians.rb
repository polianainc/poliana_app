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

    mpol.terms << term

    mpol.save()
  end
end

def add_congresses
  
  Politician.all.each do |pol|

    pol.terms.each do |term|

      term.congresses = []
      i = term.start

      while(i < (term.end - 1.month))
        term.congresses << (i.year - 1787) / 2 
        i += 1.year
      end

      term.congresses.uniq!
    end

    pol.save()
  end
end

def add_birthday_stats
  count = Politician.count.to_f
  Politician.order_by([:birthday, :asc]).each_with_index do |pol, i|
    fi = i.to_f

    calc = ((i+1.0)/count)
    pol.percent_age_difference = (calc*100).to_i
    puts pol.percent_age_difference
  end
end
import_raw_legislators_to_mongo
add_congresses
add_birthday_stats