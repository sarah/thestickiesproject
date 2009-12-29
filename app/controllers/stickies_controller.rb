class StickiesController < ApplicationController
  def index
    @stickies = Sticky.all
  end

  def create
    Sticky.create
    redirect_to stickies_path
  end
end
