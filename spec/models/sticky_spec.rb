require 'spec_helper'

describe Sticky do
  before(:each) do
    @valid_attributes = {
      :content => "foo",
      :left => "10",
      :top => "10"
    }
  end
  context "required fields" do
    [:left, :top].each do |required_field|
      it "requires #{required_field}" do
        @valid_attributes.delete(required_field)
        Sticky.new(@valid_attributes).should_not be_valid
      end
    end
  end
  it "should create a new instance given valid attributes" do
    Sticky.create!(@valid_attributes)
  end
end
