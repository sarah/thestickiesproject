class StickiesController < ResourceController::Base
  belongs_to :surface

  create.response do |wants|
    wants.json { render :json => current_stickie_as_json }
  end
  update.wants.json { render :nothing => true }
  destroy.response do |wants|
    wants.json { render :nothing => true }
  end

  private
  def build_object
    @object ||= end_of_association_chain.build(:left => 10, :top => 10)
  end

  def current_stickie_as_json
    surface = parent_object
    stickie = object
    {:id  => stickie.id, :content => stickie.content, :left => stickie.left, :top => stickie.top,
      :delete_url => surface_sticky_url(surface, stickie),
      :update_url => surface_sticky_url(surface, stickie)}
  end
end
