class Createsnippets < ActiveRecord::Migration
  def change
    create_table :snippets do |t|
      t.string :text
      t.integer :article_id
      t.integer :start
      t.integer :end

      t.timestamps
    end
  end
end
