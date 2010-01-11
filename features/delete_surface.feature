Feature: deleting surfaces 

  Scenario: Delete surface from the surface list
    Given I have a surface "foo"
    And I am on the surfaces list page
    When I follow delete for surface "foo"
    Then I should be on the surfaces list page
    And I should not see "foo"
