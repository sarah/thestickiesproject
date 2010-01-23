class StickiesController < ResourceController::Base
  belongs_to :surface

  create.response do |wants|
    wants.json { render :json => object.to_json(:only => [:id, :content, :left, :top]) }
  end
  update.response do |wants|
    wants.json { render :blank => true }
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
