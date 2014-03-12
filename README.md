poliana_app
===========

Installation and configuration:

Dependencies (install via your favorite package manager):
mysql, phantomjs

java - for solr, your OS should take care of updating this when you start running the solr commands

1. Clone the repository
2. Create poliana_development database on your local installation of mysql
3. Make a config/database.yml file as a copy of database-sample.yml
4. Update database.yml with your local mysql information
5. Install latest version of ruby 1.9.3 using rvm (rvm install 1.9.3, rvm use 1.9.3)
6. Create the poliana gemset for this version of ruby (rvm gemset create poliana, rvm gemset use poliana)
7. bundle install
8. rake db:migrate
9. rake db:test:prepare
10. guard # Runs the test suite
11. rake sunspot:solr:start # starts the local solr search server
12. rake sunspot:reindex # Updates your search indexing to include the lastest database records

If your tests are passing, you're ready to go!
