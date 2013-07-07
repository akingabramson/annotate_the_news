# == Schema Information
#
# Table name: topics
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Topic < ActiveRecord::Base
  attr_accessible :name

  has_many :articles, :order => "created_at DESC"

  def newest_articles
    articles.limit(5)
  end
end
