class RemoveInvitationKeyFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :invitation_key
  end
end