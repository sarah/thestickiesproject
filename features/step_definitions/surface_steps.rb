When /^I submit the surface name "([^\"]*)"$/ do |name|
  fill_in "Name", :with => name
  click_button 'Create Surface'
end

