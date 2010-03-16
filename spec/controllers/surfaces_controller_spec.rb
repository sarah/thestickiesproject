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

    context "logged_in" do
    end
  end

  context "non-user-owned surfaces" do
    context "logged_in" do
      let(:current_user) {double(User)}
      let(:surface) {double(Surface).as_null_object}
      before(:each) do
        controller.stub(:current_user).and_return(current_user)
        Surface.stub(:find).and_return(surface)
      end
      describe "PUT /surfaces/foo/claim" do
        it "assigns the surface to the current user" do
          surface.should_receive(:user=).with(current_user)
          surface.should_receive(:save)
          put :claim, :id => 'irrelevant'
        end

        it "redirects me to the surface as assigned to the current_user" do
          put :claim, :id => 'irrelevant'
          response.should redirect_to(user_surface_url(current_user, surface))
        end
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
