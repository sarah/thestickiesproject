class StickiesController < ResourceController::Base
  create.wants.html { redirect_to collection_path }
  update.wants.json { render :nothing => true}
  private
  def build_object
    @object ||= Sticky.new(:x => 10, :y => 10)
  end
end
