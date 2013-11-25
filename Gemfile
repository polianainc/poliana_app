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
gem 'compass-rails'
gem 'zurb-foundation'
gem 'turbolinks'
gem 'jquery-turbolinks'

#AWS
gem 'aws-sdk'

group :development, :test do
  #Email
  gem 'letter_opener'
  
  #Testing
	gem 'rspec-rails', '2.11.0'
  gem 'spork-rails', github: 'sporkrb/spork-rails'
  gem 'guard-spork', '1.5.0'
  gem 'childprocess', '0.3.6'
  gem 'guard-rspec'
  
  #Notifications
  gem 'growl'
  
  #Test DB
	gem 'sqlite3'
end

group :test do
  gem 'capybara'
  gem 'factory_girl_rails'
end

group :assets do
  gem 'jquery-rails'

  gem 'sass-rails',   '~> 3.2.3'
  gem 'therubyracer', :platforms => :ruby, :group => :production
  gem 'uglifier', '>= 1.0.3'
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
