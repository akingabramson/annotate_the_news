class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :url
      t.string :title
      t.text :body
      t.string :news_source
      t.integer :submitter_id
      t.integer :topic_id
      t.boolean :recommended, default: false

      t.timestamps
    end
  end
end
