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
  
end
