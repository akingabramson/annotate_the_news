class Uservote < ActiveRecord::Base
  attr_accessible :annotation_id, :upvote, :user_id

  validates :annotation_id, :user_id, presence: :true
  validates :upvote, inclusion: [true, false]

  validates_uniqueness_of :user_id, scope: :annotation_id

  belongs_to :user
  belongs_to :annotation



end
