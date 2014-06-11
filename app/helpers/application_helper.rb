module ApplicationHelper
  def javascript_exists?(script)
    scriptJS = "#{Rails.root}/app/assets/javascripts/#{script}.js"
    scriptCOFFEE = "#{Rails.root}/app/assets/javascripts/#{script}.coffee"
    File.exists?(scriptJS) || File.exists?(scriptCOFFEE)
  end

  def stylesheet_exists?(stylesheet)
    stylesheetCSS = "#{Rails.root}/app/assets/stylesheets/#{stylesheet}.css"
    stylesheetSCSS = "#{Rails.root}/app/assets/stylesheets/#{stylesheet}.scss"
    File.exists?(stylesheetCSS) || File.exists?(stylesheetSCSS)
  end

  def throw_errors(name, errors)
    if errors.length > 1
      the_string = "<div class='small-12 columns'><small class='error'><ul>".html_safe

      errors.each do |error|
        the_string += "<li>".html_safe + name + " " + error + "</li>".html_safe
      end

      the_string +="</ul></small></div>".html_safe
    elsif errors.length == 1
      the_string = "<div class='small-12 columns'><small class='error'>#{name} #{errors[0]}</small></div>".html_safe
    end
  end
end

class String
  def words_limit(limit)
    string_arr = self.split(' ')
    string_arr.count > limit ? "#{string_arr[0..(limit-1)].join(' ')}..." : self
  end
end
