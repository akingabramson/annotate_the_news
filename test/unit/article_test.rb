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

require 'test_helper'

class ArticleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
