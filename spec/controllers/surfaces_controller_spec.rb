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
    describe "PUT /surfaces/foo/claim" do
      let(:user) {double(User)}
      let(:surface) {double(Surface).as_null_object}
      before(:each) do
        controller.stub(:current_user).and_return(user)
        Surface.stub(:find).and_return(surface)
      end
      it "assigns the surface to the current user" do
        surface.should_receive(:user=).with(user)
        surface.should_receive(:save)
        put :claim, :id => 'irrelevant'
      end

      it "redirects me to the surface as assigned to the current_user" do
        put :claim, :id => 'irrelevant'
        response.should redirect_to(user_surface_url(user, surface))
      end
    end

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
