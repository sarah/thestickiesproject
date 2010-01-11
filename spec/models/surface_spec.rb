require 'spec_helper'

describe Surface do
  before(:each) do
    @valid_attributes = {
      :name => 'valid12 with spaces'
    }
  end

  it "only allows alphaneumeric characters and spaces in the name" do
    Surface.new(:name => '.\/').should_not be_valid
  end

  it "requires name" do
    Surface.new(:name => "").should_not be_valid
    Surface.new(:name => "   ").should_not be_valid
  end

  it "should create a new instance given valid attributes" do
    Surface.create!(@valid_attributes)
  end

  it "requires a unique name" do
    Surface.create!(:name => "my name")
    Surface.new(:name => "my name").should_not be_valid
  end
  
  context "invalid name" do
    it "resets the name to what it was" do
      surface = Surface.create!(@valid_attributes)
      surface.name = ""
      surface.save
      surface.name.should == @valid_attributes[:name]
    end
  end
end
