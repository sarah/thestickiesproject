class SurfacesController < ResourceController::Base
  belongs_to :user

  show.before do 
    @stickies = @surface.stickies
  end
end
