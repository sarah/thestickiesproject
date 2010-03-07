class SessionsController < Clearance::SessionsController
  private
  def url_after_create
    user_surfaces_path(current_user)
  end
end
