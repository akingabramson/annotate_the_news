class ArticlesController < ApplicationController
  def show
    @article = Article.find(params[:id], include: {snippets: :annotations})
    if @article
      render json: @article
      # with associated snippets
    else
      render json: {}, status: 404
    end
  end

  def create
    @article = current_user.submitted_articles.build(params[:article])
    if @article.save
      render json: @article
    else
      render json: @article.errors.full_messages, status: 422
    end
  end
  
end
