Feature: creating surfaces


  Scenario: Create surface
    Given I am on the new surface page
    When I submit the surface name "Foo"
    Then I should be on the surface page for "Foo"
    And I should see "Foo"
