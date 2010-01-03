def valid_sticky(content = {})
  Sticky.create(content.merge(:x => 0, :y => 0))
end
Given /^I create a new sticky$/ do
  valid_sticky
end

Given /^a sticky with content "([^\"]*)"$/ do |content|
  valid_sticky(:content => content)
end

Given /^(\d*) stick(?:y|ies)$/ do |count|
  count.to_i.times do
    valid_sticky
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
  click_link "delete_sticky_#{sticky_to_delete.id}"
end
