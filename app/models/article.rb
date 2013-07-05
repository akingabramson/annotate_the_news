# == Schema Information
#
# Table name: articles
#
#  id           :integer          not null, primary key
#  url          :string(255)
#  title        :string(255)
#  body         :text
#  news_source  :string(255)
#  submitter_id :integer
#  topic_id     :integer
#  recommended  :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Article < ActiveRecord::Base
  attr_accessible :body, :news_source, :recommended, :submitter_id, :title, :topic_id, :url
  
  validates :body, :url, :title, :news_source, :submitter_id, :topic_id, presence: :true
  validates :url, uniqueness: true

  has_many :snippets
  belongs_to :topic
  belongs_to :submitter, class_name: "User", :foreign_key => :submitter_id

  searchable do
    text :title, :body, :news_source, stored: true
    boolean :recommended
  end

  def as_json(options = {})
    super(options.merge({:include => :snippets}))
  end

end
