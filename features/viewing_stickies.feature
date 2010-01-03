@wip
Feature: Viewing Stickies
In order to keep track of my thoughts
As a user
I would like to see the content of the stickies

  Scenario: Content
    Given a sticky with content "foo"
    When I go to the sticky stage
    Then I should see a sticky with content "foo"
