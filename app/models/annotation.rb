class Annotation < ActiveRecord::Base
  attr_accessible :annotator_id, :snippet_id, :body

  validates :annotator_id, :snippet_id, :body, presence: true


  belongs_to :annotator, class_name: "User", foreign_key: :annotator_id
  belongs_to :snippet


end
