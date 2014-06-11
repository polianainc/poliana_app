@start_date = Date.new(2003, 1, 1)

def import_raw_legislators_to_mongo

  json = File.read('lib/assets/legislators.json')
  legislators = JSON.parse(json)

  legislators.each_with_index do |pol, i|

    if pol["bioguide_id"] == nil
      puts "bioguide nil: " + pol["first_name"] + " " + pol["last_name"]
      next
    end

    term_start = DateTime.strptime((pol["begin_timestamp"]).to_s, '%s').to_date
    term_end = DateTime.strptime((pol["end_timestamp"]).to_s, '%s').to_date

    term_type = pol["term_type"]

    if term_start < @start_date
      next
    end

    # incorrect term end senate fix
    if term_end < @start_date && term_type == "sen" && term_start + 6.years <= Date.today
      puts "incorrect term end senate: " + pol["first_name"] + " " + pol["last_name"] + ", end: " + term_end.to_s
      term_end = term_start + 6.years

    # incorrect term end house fix
    elsif term_end < @start_date && term_type == "rep" && term_start + 2.years <= Date.today
      puts "incorrect term end house: " + pol["first_name"] + " " + pol["last_name"] + ", end: " + term_end.to_s
      term_end = term_start + 2.years

    # elected within term limit fix
    elsif term_end < @start_date && term_start >= @start_date
      puts "elected within term limit: " + pol["first_name"] + " " + pol["last_name"] + ", elected on: " + term_start.to_s
      term_end = Date.today
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

    mpol.state ||= pol["term_state"]

    term = Term.new()
    term.term_type = term_type
    term.start = term_start
    term.end = term_end

    mpol.terms << term if mpol.terms.where(:start => term.start).count == 0


    mpol.save()
  end

  add_senator_edge_cases(legislators)
  patch_cheney
  add_birthday_stats
  add_pre_election_terms
  add_congresses
  add_image_urls
  add_contribution_totals
end

#Adds senator terms which straddle our start date (i.e. they were elected 4 years or 2 years before the start of the 108th congress) so that we don't incorrectly say that these were pre election terms for these congresspeople
def add_senator_edge_cases(legislators)
  senator_edge_cases = {}
  legislators.each_with_index do |pol, i|

    if pol["bioguide_id"] == nil
      next
    end

    term_start = DateTime.strptime((pol["begin_timestamp"]).to_s, '%s').to_date
    term_end = DateTime.strptime((pol["end_timestamp"]).to_s, '%s').to_date

    term_type = pol["term_type"]

    if term_type == "sen" && (term_start > Date.new(1998, 12, 31) && term_start < @start_date)
      senator_edge_cases[pol["bioguide_id"]] = i
    end
  end

  pols = Politician.in(:bioguide_id => senator_edge_cases.keys)

  pols.each do |pol|
    i = senator_edge_cases[pol.bioguide_id]
    info = legislators[i]

    term_start = DateTime.strptime((info["begin_timestamp"]).to_s, '%s').to_date
    term_end = DateTime.strptime((info["end_timestamp"]).to_s, '%s').to_date
    term_type = info["term_type"]
    if term_end < @start_date
      term_end = term_start + 6.years
    end

    term_start = @start_date + 2.days

    term = Term.new()
    term.term_type = term_type
    term.start = term_start
    term.end = term_end

    pol.terms << term

    pol.save()
  end
end

def add_congresses

  Politician.all.each do |pol|

    pol.terms.each do |term|

      term.congresses = []
      i = term.start

      while(i < (term.end - 1.month))
        cong_num = (i.year - 1787) / 2
        # HACK: Remove 114 congress since we don't have data on that
        term.congresses <<  cong_num if (cong_num != 114)
        i += 1.year
      end

      term.congresses.uniq!
    end

    pol.save()
  end
end

#HACK adds Cheney's vice presidential term as a half term to not conflict with our start date or throw weird errors
def patch_cheney
  cheney = Politician.where(:bioguide_id => "C000344").first
  term = Term.new
  term.start = @start_date + 2.days
  term.end = DateTime.strptime("1106179200", '%s').to_date
  term.term_type = "viceprez"
  cheney.terms << term
end

def add_birthday_stats
  count = Politician.count.to_f
  Politician.order_by([:birthday, :asc]).each_with_index do |pol, i|
    fi = i.to_f

    calc = ((fi+1.0)/count)
    pol.percent_age_difference = (calc*100).to_i
    pol.save()
  end
end

def add_pre_election_terms
  Politician.all.each do |pol|

    first_term = pol.terms.sort_by { |t| t.start }[0]

    pre_election_term_start = first_term.start - 2.years - 1.day

    if pre_election_term_start < @start_date
      next
    else
      pre_election_term = Term.new()

      pre_election_term.start = pre_election_term_start
      pre_election_term.end = pre_election_term_start + 2.years

      pol.terms << pre_election_term
      pol.save()
    end
  end
end

def add_image_urls
  Politician.each do |pol|
    uri = URI("https://s3.amazonaws.com/poliana.media/web/" + pol.bioguide_id + ".png")

    request = Net::HTTP.new uri.host
    response = request.request_head(uri.path)

    if response.code.to_i == 200
      pol.image_url = uri
    else
      pol.image_url = "/assets/politician-male.png" if pol.gender == "M"
      pol.image_url = "/assets/politician-female.png"  if pol.gender == "F"
    end
    pol.save
  end
end

def add_contribution_totals
  congresses = (108..113)
  totals_cache = {}

  congresses.each do |c|
    url = "http://poliana-staging.elasticbeanstalk.com/politicians/contributions?apikey=07f8f343-f811-4174-94a4-9da1048fb9fe&congress=#{c}"
    response = HTTParty.get(url)
    totals_cache[c] = JSON.parse(response.body)["content"]
  end

  Politician.each do |pol|
    pol.terms.each do |t|
      t.congresses.each do |c|
        data = totals_cache[c].select { |d| d["bioguide_id"] == pol.bioguide_id }
        if data.count > 0
          data = data[0]
          pol.contributions[c] = { industry: data["individual_contributions"], pac: data["pac_contributions"] }
          pol.save
        else
          pol.contributions[c] = { industry: 0.0, pac: 0.0 }
          pol.save
        end
      end
    end
  end
end

# RUN THE CODE
import_raw_legislators_to_mongo
