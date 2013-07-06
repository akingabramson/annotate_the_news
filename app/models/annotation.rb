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

class Annotation < ActiveRecord::Base
  attr_accessible :annotator_id, :snippet_id, :body

  validates :annotator_id, :snippet_id, :body, presence: true

  has_many :user_votes, class_name: "Uservote", foreign_key: :annotation_id

  belongs_to :annotator, class_name: "User", foreign_key: :annotator_id
  belongs_to :snippet

  def iq
    upvotes = user_votes.select {|vote| vote.upvote == true}.count
    downvotes = user_votes.select {|vote| vote.upvote == false}.count

    return upvotes - downvotes
  end

  def as_json(options = {})
    super(options.merge({include: [:annotator, :user_votes, :iq]}))
    # {include: [:id, :username, :iq]}
  end
end
