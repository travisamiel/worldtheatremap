Feature: Events listing on show pages

  As a user
  I want to see all events for a show
  So I can know more about the show

  Background:
    Given I am on the English language home page

  Scenario: Users should be see all events associated with a show
    And I am logged in
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I go to the "event" add page
    And I fill in ".event-show-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I fill in ".event-about-edit" with "http://google.com"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in ".event-street-address-edit" with "Brandsen 805"
    And I fill in ".event-locality-edit" with "Buenos Aires"
    And I select "Argentina" from the ".country-select-edit" combobox
    And I fill in ".event-postal-code-edit" with "1161"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"
    When I go to the show page for "Sofia"
    Then the "article.event-teaser" element should contain "Performance"
    And the ".event-location" element should contain "Buenos Aires, Argentina"
    And the ".event-date-range" element should contain the date range for day "1" to day "15" of this month
    And the ".event-organizations" element should contain "Organization of the year"
