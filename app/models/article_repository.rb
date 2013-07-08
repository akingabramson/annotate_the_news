class ArticleRepository < ActiveRecord::Base
  ARTICLES_PER_PAGE = 5

  attr_accessor :params

  def initialize(params)
    self.params = params
  end

  def search
    query = params[:q]
    model.tire.search(load: true, page: params[:page], per_page: ARTICLES_PER_PAGE) do
      query { string query, default_operator: "AND" } if query.present?
      filter :range, created_at: { lte: Time.zone.now }
      sort { by :created_at, "desc" } if query.blank?
    end
  end

  protected

  def model
    Article
  end
end
