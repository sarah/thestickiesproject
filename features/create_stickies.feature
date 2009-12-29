Feature: Create Stickies

In order to keep track of things
As a user
I want to create a sticky

  Scenario: Creating first sticky
    Given I am on the sticky stage
    When I press "new sticky"
    Then I should see a new sticky
