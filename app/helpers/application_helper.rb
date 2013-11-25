module ApplicationHelper
end

class String
  def words_limit(limit)
    string_arr = self.split(' ')
    string_arr.count > limit ? "#{string_arr[0..(limit-1)].join(' ')}..." : self
  end
  
  def convert_party(to)
    if to == "abbrev"
  		if self == "Democrat" or self == "Democrats"
  			"D"
  		elsif self == "Republican" or self == "Republicans"
  			"R"
  		else
  			"I"
			end
  	else
  		if self == "D"
  			"Democrat"
  		elsif self == "R"
  			"Republican"
  		else	
  			"Independent"
			end
  	end
  end
end