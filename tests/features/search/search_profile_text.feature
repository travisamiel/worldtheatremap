@search
Feature: Search box on profile search

  As a user
  I want to search profiles by name
  So I can find specific profiles I already know about

  Background:
    Given I am on the English language home page
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I click on ".edit-profile-save"
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Aadya"
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    And I should not see ".search-results"

  Scenario: Users can search for profiles by name (partial/full, different case variations)
    # Full name, match case
    When I fill in ".profile-search-text" with "Fatima"
    Then the ".search-results" element should contain "Fatima"
    And the ".search-results" element should not contain "Aadya"
    # Full name, different case
    When I fill in ".profile-search-text" with "fatima"
    Then the ".search-results" element should contain "Fatima"
    # Partial name (begining), match case
    When I fill in ".profile-search-text" with "Fat"
    Then the ".search-results" element should contain "Fatima"
    # Partial name (end), match case
    When I fill in ".profile-search-text" with "ima"
    Then the ".search-results" element should contain "Fatima"

  @i18n
  Scenario: Users can search for profiles by their translated name
    And I click on ".language-switcher [name=es]"
    And I go to the profile page for "Fatima"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "Ximena"
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    When I fill in ".profile-search-text" with "Ximena"
    Then the ".search-results" element should not contain "Fatima"
    Then the ".search-results" element should contain "Ximena"

  @i18n
  Scenario: If a profile does not have a translation then it should be searchable by it's original name when viewing in another language
    And I click on ".language-switcher [name=es]"
    And I go to the "profiles" search page
    When I fill in ".profile-search-text" with "fatima"
    Then the ".search-results" element should contain "Fatima"

  Scenario: If a profile has diacritics it can be found searching with the original characters
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Åüdyçø"
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    When I fill in ".profile-search-text" with "Audyco"
    Then the ".search-results" element should contain "Åüdyçø"

  Scenario: If a profile has diacritics it can be found searching with romanized characters
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Åüdyçø"
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    When I fill in ".profile-search-text" with "Åüdyçø"
    Then the ".search-results" element should contain "Åüdyçø"
