Feature: creating surfaces as a non logged in user


  Scenario: Create surface from new surface page
    Given I am on the new surface page
    When I submit the surface name "foo"
    Then I should be on the surface page for "foo"
    And I should see "foo"
  
  Scenario: Create surface from new surface page - case sensitive
    Given I am on the new surface page
    When I submit the surface name "Foo"
    Then I should be on the surface page for "Foo"
    And I should see "Foo"

  Scenario: Create new surface from existing surface page
    Given I have a surface "foo"
    And I am on the surface page for "foo"
    When I submit the surface name "bar"
    Then I should be on the surface page for "bar"
