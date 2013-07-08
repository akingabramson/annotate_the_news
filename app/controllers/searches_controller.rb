class SearchesController < ApplicationController
  def show
    if params[:limit]
      limit = params[:limit]
    else
      limit = -1
    end

    @articles = Article.search_by_article(params[:q])
    p @articles
    render json: @articles[0..limit.to_i]
  end
end
