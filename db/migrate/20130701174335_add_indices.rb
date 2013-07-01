class AddIndices < ActiveRecord::Migration
  def change
    add_index :snippets, :article_id
    add_index :articles, :topic_id
  end
end
