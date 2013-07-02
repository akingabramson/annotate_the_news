class TopicsController < ApplicationController
  def index
    @topics = Topic.all
    if @topics
      render json: @topics
    else
      render json: {}, status: 404
    end
  end
end
