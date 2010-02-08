class StickiesController < ResourceController::Base
  belongs_to :surface

  create.response do |wants|
    wants.json { 
      json = {:id  => object.id, :content => object.content, :left => object.left, :top => object.top,
              :delete_url => surface_sticky_url(parent_object, object),
              :update_url => surface_sticky_url(parent_object, object)}
      render :json => json 
    }
  end
  update.wants.json { render :nothing => true }
  destroy.response do |wants|
    wants.json { render :nothing => true }
  end

  private
  def build_object
    @object ||= end_of_association_chain.build(:left => 10, :top => 10)
  end
end
