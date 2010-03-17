class SurfacesController < ResourceController::Base
  belongs_to :user

  show.before do 
    @stickies = @surface.stickies
  end

  def claim
    head(401) and return if params[:user_id]
    load_object
    @surface.user = current_user
    @surface.save
    redirect_to user_surface_url(current_user, @surface)
  end
end
