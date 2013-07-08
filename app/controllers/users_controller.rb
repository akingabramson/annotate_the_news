class UsersController < ApplicationController
  def create
    @user = User.new(params[:user])
    if @user.save
      session[:session_token] = @user.reset_session_token!
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render json: @user.to_json
    else
      render json: {}, status: 404
    end
  end

  def edit
    if current_user
      render json: current_user.to_json
    else
      render json: {}, status: 404
    end
  end

  def update
    if current_user
      current_user.password = params[:password]
      render json: current_user.to_json
    else
      render json: {}, status: 422
    end
  end
end
