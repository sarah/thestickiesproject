class StickiesController < ResourceController::Base
  create.wants.html { redirect_to collection_path }
end
