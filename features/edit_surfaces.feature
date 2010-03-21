Feature: editing surface names

  Scenario: Unclaimed surface
    Given I have a surface "foo"
    And I am on the surface page for "foo"
    When I follow "edit"
    And I fill in "Name" with "bar"
    And I press "Update Surface"
    Then I should be on the surface page for "bar"

  Scenario: Claimed surface
    Given a user "person@example.com"
    And I have a surface "foo"
    And surface "foo" is assigned to "person@example.com"
    And I am on the surface page for "foo" claimed by "person@example.com"
    When I follow "edit"
    And I fill in "Name" with "bar"
    And I press "Update Surface"
    Then I should be on the surface page for "bar" claimed by "person@example.com"
