Feature: deleting claimed surfaces

  Scenario: Delete surface from the surface list
    Given a user "person@example.com"
    And I have a surface "foo"
    And surface "foo" is assigned to "person@example.com"
    And I am on the surfaces list page for "person@example.com"
    When I follow delete for surface "foo"
    Then I should be on the surfaces list page for "person@example.com"
    And I should not see "foo"
