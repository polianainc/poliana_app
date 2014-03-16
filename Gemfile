source 'http://rubygems.org'

gem 'rails', '3.2.13'

#Debugging
gem 'pry'

#Configuration
gem 'figaro'

#Database
gem 'mongoid'

#Search
gem 'sunspot_solr'
gem 'sunspot_rails'
gem 'sunspot_mongoid2'

#Administration
gem 'rails_admin'

#Mailchimp
gem 'gibbon'

#Authentication
gem 'devise'
gem 'bcrypt-ruby'
gem 'omniauth'
gem 'omniauth-twitter'
gem 'omniauth-facebook'

#Front-end
gem 'foundation-rails'

#SEO
gem 'sitemap_generator'
gem 'gabba'

#AWS
gem 'aws-ses', '~> 0.4.4', :require => 'aws/ses'

#Data Ingestion
gem 'congress'

group :development, :test do
  #Email
  gem 'letter_opener'
  
  #Testing
  gem 'capybara'
  gem 'factory_girl_rails'
	gem 'rspec-rails', '2.11.0'
  gem 'spork-rails', github: 'sporkrb/spork-rails'
  gem 'guard-spork', '1.5.0'
  gem 'childprocess', '0.3.6'
  gem 'guard-rspec'
  gem 'jasmine-rails'
  gem 'jasmine-jquery-rails'
  gem 'guard-jasmine'
  gem 'sunspot_matchers'
  
  #Notifications
  gem 'growl'
  
  #Test DB
	gem 'sqlite3'
end

group :assets do
  gem 'jquery-rails'

  gem 'sass-rails'
  
  #Temporary bullshit... we'll have to watch how the compass-rails gem is maintained
  #They need to support to Compass 0.13 so we can handle custom keyframe animations
  gem 'compass', '~> 0.13.alpha.12'
  gem 'compass-rails'
  
  gem 'therubyracer', :platforms => :ruby, :group => :production
  gem 'uglifier', '>= 1.0.3'
  
  #Asset Compilation Speedup
  gem 'turbo-sprockets-rails3'
end

group :production do
	gem 'mysql2'
end

#Deployment Gems
gem 'rubber'
gem 'open4'
gem 'gelf'
gem 'graylog2_exceptions', :git => 'git://github.com/wr0ngway/graylog2_exceptions.git'
gem 'graylog2-resque'
