class CreateSnippets < ActiveRecord::Migration
  def change
    create_table :snippets do |t|
      t.integer :article_id
      t.string :words

      t.timestamps
    end
  end
end
