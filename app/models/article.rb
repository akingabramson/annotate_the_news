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
  include PgSearch
  pg_search_scope :search_by_article, :against => {
                    title: "A",
                    body: "B",
                    news_source: "C"}, :using => :tsearch

  attr_accessible :body, :news_source, :recommended, :submitter_id, :title, :topic_id, :url
  
  validates :body, :url, :title, :news_source, :submitter_id, :topic_id, presence: :true
  validates :url, uniqueness: true

  has_many :snippets
  belongs_to :topic
  belongs_to :submitter, class_name: "User", :foreign_key => :submitter_id



  def as_json(options = {})
    super(options.merge({include: {snippets: {include: {annotations: {include: :annotator}}}}}))
  end

end
