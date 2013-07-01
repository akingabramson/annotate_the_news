class SnippetsController < ApplicationController
  def create
    @snippet = Snippet.new(params[:snippet])
    if @snippet.save
      render json: @snippet
    else
      render json: {}, status: 422
    end
  end

  def update
  end

  def destroy
  end

  def show
  end

end