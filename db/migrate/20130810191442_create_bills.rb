class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.text :summary
      t.string :title
      t.string :data_id
      t.string :sponsor_name
      t.string :result

      t.timestamps
    end
  end
end
