Given /^I have a surface "([^\"]*)"$/ do |name|
  Surface.create! :name => name
end

When /^I follow delete for surface "([^\"]*)"$/ do |name|
  surface = Surface.find_by_name name
  within("#surface_#{surface.id}") do |scope|
    scope.click_link "delete"
  end
end

When /^I submit the surface name "([^\"]*)"$/ do |name|
  fill_in "Name", :with => name
  click_button 'Create Surface'
end

