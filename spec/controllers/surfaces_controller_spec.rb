require 'spec_helper'

describe SurfacesController do
  context "user-owned" do
    describe "GET /users/:user_id/surfaces" do
      it "returns the surfaces connected to that user" do
        surfaces = double("surfaces")
        user = double(User, :surfaces => surfaces)
        surfaces.stub(:find).and_return(surfaces)
        User.stub(:find).with("dummy").and_return(user)
        get :index, :user_id => "dummy"
        assigns[:surfaces].should be(surfaces)
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
