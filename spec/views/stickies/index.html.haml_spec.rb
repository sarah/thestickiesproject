require 'spec_helper'

describe "/stickies/index.html.haml" do
  let(:sticky) { mock_model(Sticky) }
  let(:stickies) { [sticky] }
  
  before(:each) do
    assigns[:stickies] = stickies
  end
  it "contains the update url on the sticky div" do
    render "/stickies/index.html.haml"

    response.should have_tag(".sticky[data-update-url = #{sticky_url(sticky)}]")
  end
end

