Then /^I should see a new sticky$/ do
  new_sticky = Sticky.last
  response.should have_selector("div", :id => "sticky_#{new_sticky.id}")
end

