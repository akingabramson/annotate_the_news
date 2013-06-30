class RecommendedArticlesController < ApplicationController
  def index
    @articles = Article.where(recommended: true)
    render json: @articles
  end
end
