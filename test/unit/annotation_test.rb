# == Schema Information
#
# Table name: annotations
#
#  id           :integer          not null, primary key
#  annotator_id :integer
#  body         :text
#  snippet_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class AnnotationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
