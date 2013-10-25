source 'http://rubygems.org'


gem 'rails', '3.2.13'

#Debugging
gem 'pry'

#Configuration
gem 'figaro'

#Database
gem 'mongoid'
#Search
gem 'sunspot_rails'

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

group :development do
  gem 'sunspot_solr'
end

group :development, :test do
  #Testing email opening in rails
  gem 'letter_opener'
  # testing
	gem 'rspec-rails', '2.11.0'
  gem 'spork-rails', github: 'sporkrb/spork-rails'
  gem 'guard-spork', '1.5.0'
  gem 'childprocess', '0.3.6'
  gem 'guard-rspec'
  # notifications
  gem 'growl'
  # test db
	gem 'sqlite3'
end

group :test do
  gem 'capybara'
  gem 'factory_girl_rails'
end

group :assets do

  gem 'jquery-rails'
  gem 'compass-rails'
  gem 'zurb-foundation'

  gem 'sass-rails',   '~> 3.2.3'
  gem 'therubyracer', :platforms => :ruby, :group => :production
  gem 'uglifier', '>= 1.0.3'
  gem 'coffee-rails'
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