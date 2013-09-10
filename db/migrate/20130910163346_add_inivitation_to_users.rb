class AddInivitationToUsers < ActiveRecord::Migration
  def change
    add_column :users, :invitation_key, :integer
    add_column :users, :invitations_left, :integer
  end
end