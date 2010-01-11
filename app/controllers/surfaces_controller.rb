class SurfacesController < ResourceController::Base
  show.before do 
    @stickies = @surface.stickies
  end

private
  def object
    @object ||= end_of_association_chain.find_by_name(params[:id].gsub("-", " "))
  end

end
