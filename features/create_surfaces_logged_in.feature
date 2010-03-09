Feature: creating surfaces as a logged in user
  Background:
    Given I am signed up and confirmed as "person@example.com/password"
    And I sign in as "person@example.com/password"

  Scenario: Create surface from new surface page
    Given I am on the new surface page
    When I submit the surface name "foo"
    Then I should be on the surface page for "foo" claimed by "person@example.com"

  Scenario: Create new surface from existing surface page
    Given I have a surface "foo"
    And I am on the surface page for "foo"
    When I submit the surface name "bar"
    Then I should be on the surface page for "bar" claimed by "person@example.com"
