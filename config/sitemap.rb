require 'rubygems'
require 'sitemap_generator'

# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "https://www.poliana.com"

SitemapGenerator::Sitemap.create do
  add '/', :changefreq => 'weekly', :priority => 0.9
  add '/search', :changefreq => 'weekly', :priority => 0.8
  add '/signin', :changefreq => 'weekly', :priority => 0.8
  add '/about', :changefreq => 'weekly', :priority => 0.7
  add '/terms', :changefreq => 'monthly', :priority => 0.2
  add '/policy', :changefreq => 'monthly', :priority => 0.2
end

SitemapGenerator::Sitemap.ping_search_engines