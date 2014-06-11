module PoliticianHelper
  def self.cache_general_religion
    Politician.all.each do |pol|
      pol.general_religion = pol.calculate_general_religion
      pol.save
    end
  end
end
