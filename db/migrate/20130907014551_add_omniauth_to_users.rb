class AddOmniauthToUsers < ActiveRecord::Migration
  def change
    add_column :users, :has_facebook, :boolean
    add_column :users, :has_twitter, :boolean
    add_column :users, :facebook_id, :string
    add_column :users, :twitter_id, :string
  end
end
