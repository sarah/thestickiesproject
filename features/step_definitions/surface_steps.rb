Given /^I have a surface "([^\"]*)"$/ do |name|
  Surface.create! :name => name
end

When /^I submit the surface name "([^\"]*)"$/ do |name|
  fill_in "Name", :with => name
  click_button 'Create Surface'
end

