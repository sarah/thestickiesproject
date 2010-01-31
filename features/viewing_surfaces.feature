@focus
Feature: Viewing surface lists

  Scenario: Viewing the list of surfaces
    Given I have a surface "surface 1"
    And I have a surface "surface 2"
    When I go to the surfaces list page
    Then I should see "surface 1"
    And I should see "surface 2"

  Scenario: Viewing surfaces assigned to a user
    Given a user "coreyhaines@example.com"
    And I have a surface "surface 1"
    And surface "surface 1" is assigned to "coreyhaines@example.com"
    When I go to the surfaces list page for "coreyhaines@example.com"
    Then I should see "surface 1"

  Scenario: Non-assigned surfaces should not show for user
    Given a user "coreyhaines@example.com"
    And I have a surface "surface 1"
    When I go to the surfaces list page for "coreyhaines@example.com"
    Then I should not see "surface 1"
