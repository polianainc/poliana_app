class CreateFeedbackers < ActiveRecord::Migration
  def change
    create_table :feedbackers do |t|
      t.string :name
      t.string :email
      t.string :description
      t.string :link
      t.string :image

      t.timestamps
    end
  end
end
