class TopicsController < ApplicationController
  def index
    @topics = Topic.all
    if @topics
      render json: @topics
    else
      render json: {}, status: 404
    end
  end

  def show
    @topic = Topic.find(params[:id])
    @articles = @topic.newest_articles
    render json: @articles
  end
end
