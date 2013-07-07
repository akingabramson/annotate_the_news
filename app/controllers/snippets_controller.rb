class SnippetsController < ApplicationController
  before_filter :require_login, only: [:create]
  
  def create    
    p "parmas are"
    p params

    @snippet = Snippet.new(params[:snippet])
    if @snippet.save
      render json: @snippet
    else
      p @snippet.errors.full_messages
      render json: {}, status: 422
    end
  end

  def update
  end

  def destroy
    @article = Article.find(params[:article_id])
    @snippets = @article.snippets.select {|snippet| snippet.id == params[:id].to_i}
    @snippet = @snippets.first
    p @snippet.annotations

    if @snippet && (@snippet.annotations.count == 0)
      @snippet.destroy
      render json: {message: "snippet destroyed"}
    else
      render json: {}, status: 422
    end
  end

  def show
    @article = Article.find(params[:article_id])
    @snippets = @article.snippets.select {|snippet| snippet.id == params[:id].to_i}
    @snippet = @snippets.first
    if @snippet
      render json: @snippet
    else
      render json: {}, status: 404
    end
  end

end
