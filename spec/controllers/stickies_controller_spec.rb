require 'spec_helper'

describe StickiesController do
  context "GET /stickies/" do
    it "assigns all the stickies" do
      Sticky.stub(:all).and_return(stickies = mock('stickies'))
      get :index
      assigns[:stickies].should == stickies
    end
  end
  context "POST /stickies/create" do
    it "redirects to index" do
      Sticky.stub(:create)
      post :create
      response.should redirect_to(stickies_path)
    end

    it "creates a new sticky" do
      Sticky.should_receive(:create)
      post :create
    end
  end
end
