require 'spec_helper'

describe SurfacesController do
  context "user-owned" do
    describe "GET /corey@example.com/surfaces" do
      it "returns the surfaces connected to that user" do
        pending
      end
    end
  end

  context "non-user-owned surfaces" do
    describe "GET /surfaces/foo" do

      it "assigns the surface's stickies" do
        stickies = []
        surface = double('surface', :stickies => stickies)
        Surface.stub(:find).and_return surface
        get :show, :id => "foo"

        assigns[:stickies].should == stickies
      end

      it "searches by the name in the url" do
        stickies = []
        surface = double('surface', :stickies => stickies)
        Surface.stub(:find).and_return surface
        get :show, :id => "foo"

        assigns[:stickies].should == stickies
      end

      context "parameterized url" do
        it "supports parameterized names with spaces" do
          stickies = []
          surface = double('surface', :stickies => stickies)
          Surface.stub(:find).and_return surface
          get :show, :id => "foo-2"

          assigns[:stickies].should == stickies
        end
      end
    end
  end
end
