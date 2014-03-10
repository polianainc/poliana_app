require 'net/http'
def populate_api_industries(start_index)
  File.open("industry_times_log_parquet#{start_index}.tsv", 'w') do |times_log|

    Politician.all[start_index..-1].each do |pol|

      host = 'poliana-staging.elasticbeanstalk.com'
      port = '80'

      path = "/politicians/#{pol.bioguide_id}/contributions/industries/?start=01-01-1990&end=01-01-2015&unit=congress"

      time_before = Time.now
      
      request = Net::HTTP::Get.new(path, initheader = { 'X-Requested-With' => "XMLHttpRequest" })
      
      http = Net::HTTP.new(host, port)
      http.read_timeout = 100000000
      http.start { |http| http.request(request) }

      time_after = Time.now
      response_time = time_after - time_before

      times_log.puts response_time.to_s
    end
  end
end
def populate_api_pacs(start_index)
  File.open("pac_times_log_parquet#{start_index}.tsv", 'w') do |times_log|

    Politician.all.each do |pol|

      host = 'poliana-staging.elasticbeanstalk.com'
      port = '80'

      path = "/politicians/#{pol.bioguide_id}/contributions/pacs/?start=01-01-1990&end=01-01-2015&unit=congress"

      time_before = Time.now
      
      request = Net::HTTP::Get.new(path, initheader = { 'X-Requested-With' => "XMLHttpRequest" })
      
      http = Net::HTTP.new(host, port)
      http.read_timeout = 100000000
      http.start { |http| http.request(request) }

      time_after = Time.now
      response_time = time_after - time_before

      times_log.puts response_time.to_s
    end
  end
end

populate_api_pacs(100)
