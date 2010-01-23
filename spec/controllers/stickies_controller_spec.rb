require 'spec_helper'

describe StickiesController do
  let(:surface) { Surface.create!(:name => "irrelevant") }
  context "POST /surfaces/:surface_name/stickies" do
    it "creates a sticky for the surface" do
      lambda { post :create, :surface_id => surface.name}.should change(surface.stickies, :count).by(1)
    end

    it "returns the new sticky as json" do
      post :create, :surface_id => surface.name
      response.body.should == Sticky.first.to_json(:only => [:id, :content, :left, :top])
    end
  end

  context "PUT /surfaces/:surface_name/stickies/:id" do
    let(:sticky) { surface.stickies.create(:content => 'irrelevant', :left => 0, :top => 0) }
    it "does not redirect" do
      put :update, :surface_id => surface.name, :id => sticky.id, :sticky => {}
      response.should_not be_redirect
    end

    it "renders nothing" do
      put :update, :surface_id => surface.name, :id => sticky.id, :sticky => {}
      response.body.should be_blank
    end

    it "updates the sticky" do
      put :update, :surface_id => surface.name, :id => sticky.id, :sticky => {:content => 'updated'}
      Sticky.find(sticky.id).content.should == 'updated'
    end
  end
end
