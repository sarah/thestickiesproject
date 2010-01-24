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
  update.response do |wants|
    wants.json { render :nothing => true }
  end
  destroy.response do |wants|
    wants.json { render :nothing => true }
  end

  private
  def build_object
    @object ||= end_of_association_chain.stickies.new(:left => 10, :top => 10)
  end

  def load_object
    @object ||= end_of_association_chain.stickies.find(param)
  end

  def parent_object
    @parent ||= parent_model.find_by_name(parent_param)
  end

  def parent_association
    @parent ||= parent_object
  end
end
