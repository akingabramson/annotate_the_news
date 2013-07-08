class RecommendedArticlesController < ApplicationController
  def index
    @articles = Article.order("created_at DESC").limit(5)
    render json: @articles
  end
end
