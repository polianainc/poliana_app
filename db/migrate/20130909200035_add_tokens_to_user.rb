class AddTokensToUser < ActiveRecord::Migration
  def change
    add_column :users, :token, :string
    add_column :users, :token_secret, :string
  end
end
