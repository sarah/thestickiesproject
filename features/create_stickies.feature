Feature: Create Stickies

In order to keep track of things
As a user
I want to create a sticky

  Scenario: Creating first sticky
    Given I am on the sticky stage
    When I press "new sticky"
    Then I should see 1 sticky
    When I press "new sticky"
    Then I should see 2 stickies

  Scenario: Persisting the stickies
    Given I am on the sticky stage
    And I create a new sticky
    And I go to the sticky stage
    Then I should see 1 sticky
