class CurrentUsersController < ApplicationController
  def show
    @user = current_user

    p "current user is"
    p @user
    
    if @user
      render json: @user
    else
      render json: {}, status: 404
    end
  end

end
