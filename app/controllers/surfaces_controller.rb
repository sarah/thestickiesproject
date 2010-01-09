class SurfacesController < ResourceController::Base
  show.before do 
    @stickies = @surface.stickies
  end
end
