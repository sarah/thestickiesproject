@wip
Feature: Deleting A Sticky
  In order to correct a mistakenly created sticky
  As a user
  I want to delete an existing sticky

  Scenario: Delete A Sticky
    Given 1 sticky
    And I am on the sticky stage
    When I delete sticky 1
    Then I should see 0 stickies

  Scenario: Delete A Sticky
    Given 3 stickies
    And I am on the sticky stage
    When I delete sticky 2
    Then I should see 2 stickies
