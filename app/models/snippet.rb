class Snippet < ActiveRecord::Base
  attr_accessible :article_id, :start, :end, :text

  validates :article_id, :start, :end, :text, presence: true
  validate :snippets_do_not_overlap

  belongs_to :article
  has_many :annotations


  def snippets_do_not_overlap
    article = Article.find(article_id)
    other_snippets = article.snippets
    other_snippets.each do |snippet|
      range = (snippet.start..snippet.end).to_a
      if range.include?(self.start) || range.include?(self.end)
        errors.add(:range, ": Can't annotate over annother annotation.")
      end
    end
  end

  def as_json(options = {})
    super(options.merge({include: :annotations}))
  end

end
