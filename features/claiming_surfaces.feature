Feature: Claiming a surface

  Scenario: Claiming a surface when signed in
    Given I am signed up and confirmed as "person@example.com/password"
    And I sign in as "person@example.com/password"
    And I have a surface "foo"
    And I am on the surface page for "foo"
    When I claim the surface
    Then I should be on the surface page for "foo" belonging to "person@example.com"

  Scenario: Can't claim a surface if not signed in
    Given I have a surface "foo"
    And I am on the surface page for "foo"
    Then I should not see "claim"

