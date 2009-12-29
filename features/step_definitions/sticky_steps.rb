Given /^I create a new sticky$/ do
  Sticky.create
end

Then /^I should see (\d*) stick(?:y|ies)$/ do |count|
  response.should have_selector("div", :class => "sticky", :count => count.to_i)
end

