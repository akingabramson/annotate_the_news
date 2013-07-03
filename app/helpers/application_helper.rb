module ApplicationHelper
  def require_login
    unless logged_in?
      flash[:error] = "Not logged in."
      render json: "Not logged in.", status: 401
    end
  end

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

end
