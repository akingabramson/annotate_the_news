class CreateUservotes < ActiveRecord::Migration
  def change
    create_table :uservotes do |t|
      t.integer :user_id
      t.integer :annotation_id
      t.boolean :upvote

      t.timestamps
    end
  end
end
