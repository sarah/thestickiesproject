require 'spec_helper'

describe SurfacesController do
  describe "GET /surfaces/1" do
    it "assigns the surface's stickies" do
      stickies = []
      surface = double('surface', :stickies => stickies)
      Surface.stub(:find).and_return surface
      get :show, :id => "1"

      assigns[:stickies].should == stickies
      
    end
  end
end
