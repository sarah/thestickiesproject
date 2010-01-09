require 'spec_helper'

describe Surface do
  before(:each) do
    @valid_attributes = {
      
    }
  end

  it "should create a new instance given valid attributes" do
    Surface.create!(@valid_attributes)
  end
end
