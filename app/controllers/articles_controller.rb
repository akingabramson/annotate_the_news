class ArticlesController < ApplicationController
  def show
    @article = Article.find(params[:id]);
    if @article
      render json: @article
      # with associated snippets
    else
      render json: {}, status: 404
    end
  end
  
end
