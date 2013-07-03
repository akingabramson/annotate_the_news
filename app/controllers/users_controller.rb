class UsersController < ApplicationController
  def create
    @user = User.new(params[:user])
    if @user.save
      render json: @user
    else
      render json: "User could not be created.", status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render json: @user
    else
      render json: {}, status: 404
    end
  end
end
