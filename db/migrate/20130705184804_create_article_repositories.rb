class CreateArticleRepositories < ActiveRecord::Migration
  def change
    create_table :article_repositories do |t|

      t.timestamps
    end
  end
end
