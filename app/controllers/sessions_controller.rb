class SessionsController < ApplicationController
  def create
    @user = User.find_by(params[:user][:username])
    if @user && @user.verify_password(params[:user][:password])
      session[:session_token] = @user.reset_session_token!
      render json: @user
    else
      render json: "Username and password combination does not match.", status: 422
    end
  end

  def destroy
    if logged_in?
      current_user.reset_session_token!
      session[:session_token] = nil
      render json: "Logout successful"
    else
      render json: "Wasn't logged in in the first place.", status: 422
    end
  end


  
end
