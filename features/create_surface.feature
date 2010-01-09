Feature: creating surfaces

  Scenario: Create surface from new surface page
    Given I am on the new surface page
    When I submit the surface name "Foo"
    Then I should be on the surface page for "Foo"
    And I should see "Foo"

  Scenario: Create new surface from existing surface page
    Given I have a surface "Foo"
    And I am on the surface page for "Foo"
    When I submit the surface name "Bar"
    Then I should be on the surface page for "Bar"
