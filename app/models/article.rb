class Article < ActiveRecord::Base
  attr_accessible :body, :news_source, :recommended, :submitter_id, :title, :topic_id, :url
  
  # validates :body, :url, :title, :news_source, :submitter_id, :topic_id, presence: :true
  # validates :url, uniqueness: true

  # belongs_to :submitter, class_name: "User", :foreign_key => :submitter_id
  # belongs_to :topic

  has_many :snippets
  belongs_to :topic
  belongs_to :submitter, class_name: "User", :foreign_key => :submitter_id



end
