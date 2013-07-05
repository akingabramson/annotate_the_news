# == Schema Information
#
# Table name: snippets
#
#  id         :integer          not null, primary key
#  text       :string(255)
#  article_id :integer
#  start      :integer
#  end        :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class SnippetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
