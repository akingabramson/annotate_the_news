class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :annotator_id
      t.text :body
      t.integer :snippet_id

      t.timestamps
    end
  end
end
