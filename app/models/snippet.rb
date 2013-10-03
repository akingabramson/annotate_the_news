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

class Snippet < ActiveRecord::Base
  attr_accessible :article_id, :text

  validates :article_id, :text, presence: true
  validate :snippets_do_not_overlap

  belongs_to :article
  has_many :annotations


  def snippets_do_not_overlap
    other_snippets = Article.find(article_id).snippets
    regex = Regexp.new(self.text)

    other_snippets.each do |snippet|
      if regex =~ snippet.text
        errors.add(:range, ": Can't annotate over annother annotation.")
      end
    end
  end

  def as_json(options = {})
    super(options.merge({include: {annotations: {include: [:annotator, :user_votes]}}}))
  end

end
