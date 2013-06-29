class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_username(params[:username])
    if @user && @user.verify_password(params[:password])
      session[:token] = @user.reset_session_token!
      redirect_to root_url
    else
      render :new
    end
  end

  def destroy
    if logged_in?
      session[:token] = nil
      @@current_user.reset_session_token!
      flash[:success] = "Logged out"
    else
      flash[:error] = "Not logged in"
    end
    redirect_to new_session_url
  end
end
