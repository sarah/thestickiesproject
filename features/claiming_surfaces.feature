Feature: Claiming a surface

  Scenario: Claiming a surface when signed in
    Given I am signed up and confirmed as "corey@example.com/password"
    And I sign in as "corey@example.com/password"
    And I have a surface "foo"
    And I am on the surface page for "foo"
    When I claim the surface
    Then I should be on the surface page for "foo" claimed by "corey@example.com"

  Scenario: Can't claim a surface if not signed in
    Given I have a surface "foo"
    And I am on the surface page for "foo"
    Then I should not see "claim"

  Scenario: Can't claim a surface that is already claimed
    Given I am signed up and confirmed as "sarah@example.com/password"
    Given I am signed up and confirmed as "corey@example.com/password"
    And I sign in as "corey@example.com/password"
    And I have a surface "foo"
    And surface "foo" is assigned to "sarah@example.com"
    And I am on the surface page for "foo" claimed by "sarah@example.com"
    Then I should not see "claim"
