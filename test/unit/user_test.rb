# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      default(""), not null
#  password_digest :string(255)      default(""), not null
#  session_token   :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  iq              :integer          default(0)
#  username        :string(255)
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
