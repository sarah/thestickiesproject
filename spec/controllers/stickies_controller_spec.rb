require 'spec_helper'

describe StickiesController do
  let(:surface) { Surface.create!(:name => "irrelevant") }
  context "POST /surfaces/:surface_name/stickies" do
    it "creates a sticky for the surface" do
      lambda { post :create, :surface_id => surface.name}.should change(surface.stickies, :count).by(1)
    end

    it "returns the new sticky as json" do
      post :create, :surface_id => surface.name
      sticky = Sticky.first
      json = {:id  => sticky.id, :content => sticky.content, :left => sticky.left, :top => sticky.top,
              :delete_url => surface_sticky_url(surface, sticky),
              :update_url => surface_sticky_url(surface, sticky)}
      response.body.should == json.to_json
    end
  end

  context "DELETE /surfaces/:surface_name/stickies/:id" do
    let(:sticky) { surface.stickies.create(:content => 'irrelevant', :left => 0, :top => 0) }
    it "does not redirect" do
      delete :destroy, :surface_id => surface.name, :id => sticky.id
      response.should_not be_redirect
    end
  end

  context "PUT /surfaces/:surface_name/stickies/:id" do
    let(:sticky) { surface.stickies.create(:content => 'irrelevant', :left => 0, :top => 0) }
    it "does not redirect" do
      put :update, :surface_id => surface.name, :id => sticky.id, :sticky => {}, :format => :json
      response.should_not be_redirect
    end

    it "renders nothing" do
      put :update, :surface_id => surface.name, :id => sticky.id, :sticky => {}, :format => :json
      response.body.should be_blank
    end

    it "updates the sticky" do
      put :update, :surface_id => surface.name, :id => sticky.id, :sticky => {:content => 'updated'}, :format => :json
      Sticky.find(sticky.id).content.should == 'updated'
    end
  end
end
