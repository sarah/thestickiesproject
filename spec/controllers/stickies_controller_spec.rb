require 'spec_helper'

describe StickiesController do
  context "POST /stickies/create" do
    it "redirects to index" do
      post :create
      response.should redirect_to(stickies_path)
    end
  end
end
