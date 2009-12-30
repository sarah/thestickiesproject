Given /^I create a new sticky$/ do
  Sticky.create
end

Given /^(\d*) stick(?:y|ies)$/ do |count|
  count.to_i.times do
    Sticky.create
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
