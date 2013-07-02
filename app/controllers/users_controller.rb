class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    if @user
      render json: @user
    else
      render json: {}, status: 404
    end
  end
end
