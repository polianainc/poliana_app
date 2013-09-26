class ChangeEmailIndexOnUser < ActiveRecord::Migration
  def up
    remove_index "users", :name => "index_users_on_email"
    add_index "users", ["email", "has_facebook", "has_twitter", "facebook_id", "twitter_id"], :name => "index_users_on_email", :unique => true
  end

  def down
    remove_index "users", :name => "index_users_on_email"
    add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  end
end
