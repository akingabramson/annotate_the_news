class Snippet < ActiveRecord::Base
  attr_accessible :article_id, :words

  validates :article_id, :words, presence: true
  validates_uniqueness_of :words, :scope => :article_id 

  belongs_to :article
  has_many :annotations
end
