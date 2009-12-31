require 'spec_helper'

describe StickiesController do
  context "POST /stickies/create" do
    it "redirects to index" do
      post :create
      response.should redirect_to(stickies_path)
    end
  end

  context "PUT /stickies/:id.json" do
    it "does not redirect" do
      sticky = mock_model(Sticky).as_null_object
      Sticky.stub(:find).and_return(sticky)
      put :update, :id => '1', :sticky => {}, :format => :json
      response.should_not be_redirect
    end

    it "renders nothing" do
      sticky = mock_model(Sticky).as_null_object
      Sticky.stub(:find).and_return(sticky)
      put :update, :id => '1', :sticky => {}, :format => :json
      response.body.should be_blank
    end
  end
end
