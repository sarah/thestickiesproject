require 'spec_helper'

describe SurfacesController do
  describe "GET /surfaces/foo" do

    it "assigns the surface's stickies" do
      stickies = []
      surface = double('surface', :stickies => stickies)
      Surface.stub(:find_by_name).and_return surface
      get :show, :id => "foo"

      assigns[:stickies].should == stickies
    end

    it "searches by the name in the url" do
      stickies = []
      surface = double('surface', :stickies => stickies)
      Surface.should_receive(:find_by_name).with("foo").and_return surface
      get :show, :id => "foo"

      assigns[:stickies].should == stickies
    end

    context "parameterized url" do
      it "supports parameterized names with spaces" do
        stickies = []
        surface = double('surface', :stickies => stickies)
        Surface.should_receive(:find_by_name).with("foo 2").and_return surface
        get :show, :id => "foo-2"

        assigns[:stickies].should == stickies
      end
    end
  end
end
