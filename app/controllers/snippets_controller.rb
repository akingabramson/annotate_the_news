class SnippetsController < ApplicationController
  def create
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
  end

  def show
    @article = Article.find(params[:article_id])
    @snippets = @article.snippets.select {|snippet| p snippet.id == params[:id].to_i}
    @snippet = @snippets.first
    if @snippet
      render json: @snippet
    else
      render json: {}, status: 404
    end
  end

end
