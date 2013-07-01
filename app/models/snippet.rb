class Snippet < ActiveRecord::Base
  attr_accessible :article_id, :start, :end, :text

  validates :article_id, :start, :end, :text, presence: true
  validate :snippets_do_not_overlap

  belongs_to :article
  has_many :annotations


  def snippets_do_not_overlap
    other_snippets = a.snippets
    other_snippets.each do |snippet|
      range = (snippet.start..snippet.end).to_a
      if range.include?(self.start) || range.include?(self.end)
        errors.add(:range, "Can't annotate over annother annotation.")
      end
    end
  end

end
