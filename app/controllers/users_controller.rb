class UsersController < ApplicationController
  def new
    @user = User.new
    @errors = {}
  end

  def create
    @user = User.new(params[:user])
    p "password is"
    p @user.password
    if @user.save
      session[:token] = @user.reset_session_token!
      redirect_to root_url
    else
      @errors = @user.errors.messages
      p "errors are"
      p @errors
      render :new
    end
  end

  def destroy
    if logged_in?
      @@current_user.destroy
      flash[:success] = "Successfully deleted account."
      redirect_to new_session_url
    else
      flash[:error] = "Not logged in!"
      redirect_to new_session_url
    end
  end
end
