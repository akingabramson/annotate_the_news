class UserVotesController < ApplicationController
  before_filter :require_login

  def create
    @uservote = current_user.user_votes.build(params[:user_vote])
    if @uservote.save
      render json: @uservote
    else
      p @uservote.errors
      render json: @uservote.errors, status: 422
    end
  end

  def destroy
    p current_user.username
    @uservote = Uservote.find(params[:id])
    p @uservote.user_id
    if @uservote && (@uservote.user_id == current_user.id)
      @uservote.destroy
      render json: {message: "destroyed"}     
    else
      render json: {}, status: 422
    end
  end

  def update
    @uservote = current_user.user_votes.find(params[:id])
    if @uservote && @uservote.update_attributes(params[:user_vote])
      render json: @uservote    
    else
      render json: {}, status: 422
    end
  end
  
end
