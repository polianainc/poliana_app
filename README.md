poliana_app
===========

Installation and configuration:

Dependencies (install via your favorite package manager):
mysql, phantomjs

java - for solr, your OS should take care of updating this when you start running the solr commands

1. Clone the repository
2. Create poliana_development database on your local installation of mysql
3. Setup your database.yml file to point to the poliana_development database and configure the username and password to allow access thru rails
4. Install latest version of ruby 1.9.3 using rvm
5. Create the poliana gemset for this version of ruby
6. bundle install
7. rake db:migrate
8. rake db:test:prepare
9. guard # Runs the test suite
10. rake sunspot:solr:start # starts the local solr search server
11. rake sunspot:reindex # Updates your search indexing to include the lastest database records

If your tests are passing, you're ready to go!
