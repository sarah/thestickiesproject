Feature: Claiming a surface
  Background:
    Given I am signed up and confirmed as "person@example.com/password"
    And I sign in as "person@example.com/password"

  Scenario:
    Given I have a surface "foo"
    And I am on the surface page for "foo"
    When I claim the surface
    Then I should be on the surface page for "foo" belonging to "person@example.com"
