Given /^I create a new sticky$/ do
  Sticky.create
end

Given /^a sticky with content "([^\"]*)"$/ do |content|
  Sticky.create(:content => content)
end

Given /^(\d*) stick(?:y|ies)$/ do |count|
  count.to_i.times do
    Sticky.create
  end
end

Then /^I should see a sticky with content "([^\"]*)"$/ do |content|
  sticky = Sticky.find_by_content(content)
  response.should have_tag(".sticky", :id => "sticky_#{sticky.id}") do |sticky_div|
    sticky_div.should contain(content)
  end
end

Then /^I should see (\d*) stick(?:y|ies)$/ do |count|
  response.should have_selector("div", :class => "sticky", :count => count.to_i)
end

When /^I delete sticky (\d*)$/ do |sticky_index|
  sticky_to_delete = Sticky.all[sticky_index.to_i-1]
  within("#sticky_#{sticky_to_delete.id}") do |scope|
    scope.click_link('x')
  end
end
