Given /^a user "([^\"]*)"$/ do |email|
  User.create!(:email => email, :password => 'corey')
end

Given /^I have a surface "([^\"]*)"$/ do |name|
  Surface.create! :name => name
end

Given /^surface "([^\"]*)" is assigned to "([^\"]*)"$/ do |surface_name, email|
  surface = Surface.find_by_name(surface_name)
  user = User.find_by_email(email)
  user.surfaces << surface
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

When /^I claim the surface$/ do
  click_link 'claim'
end
