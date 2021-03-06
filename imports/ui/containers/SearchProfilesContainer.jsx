import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import SearchProfiles from '../pages/SearchProfiles.jsx';

const SearchProfilesContainer = createContainer(() => {
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  const interestsSubscribe = TAPi18n.subscribe('interests.public');
  const rolesSubscribe = TAPi18n.subscribe('roles.public');
  const orgTypesSubscribe = TAPi18n.subscribe('orgTypes.public');
  const gendersSubscribe = TAPi18n.subscribe('genders.public');
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const administrativeAreasSubscribe = Meteor.subscribe('administrativeAreas.public');
  const ethnicitiesSub = Meteor.subscribe('ethnicities.public');

  return {
    loading: !(
      localitiesSubscribe.ready() &&
      interestsSubscribe.ready() &&
      rolesSubscribe.ready() &&
      orgTypesSubscribe.ready() &&
      gendersSubscribe.ready() &&
      countriesSubscribe.ready() &&
      administrativeAreasSubscribe.ready() &&
      ethnicitiesSub.ready()
    ),
  };
}, SearchProfiles);

export default SearchProfilesContainer;
