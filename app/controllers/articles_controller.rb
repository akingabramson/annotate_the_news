class ArticlesController < ApplicationController

  def show

    @article = Article.find(params[:id])
    
    if @article
      render json: @article
      # with associated snippets
    else
      render json: {}, status: 404
    end
  end

  def create
    @article = current_user.submitted_articles.build(params[:article])
    @article.body = @article.body.html_safe
    if @article.save
      flash[:article_success] = "Article created."
      render json: @article
    else
      flash[:article_success] = "Article could not be created."
      render json: @article.errors.full_messages, status: 422
    end
  end
  
end
