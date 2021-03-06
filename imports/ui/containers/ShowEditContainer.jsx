import { TAPi18n } from 'meteor/tap:i18n';
import { Shows } from '../../api/shows/shows.js';
import { createContainer } from 'meteor/react-meteor-data';
import ShowPage from '../pages/ShowPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleShowSubscribe = TAPi18n.subscribe('shows.singleById', id);
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const languagesSubscribe = TAPi18n.subscribe('languages.public');
  const interestsSubscribe = TAPi18n.subscribe('interests.public');

  const loading = !(
    singleShowSubscribe.ready() &&
    languagesSubscribe.ready() &&
    interestsSubscribe.ready() &&
    countriesSubscribe.ready()
  );

  const show = Shows.findOne(id);
  const showExists = !loading && !!show;
  return {
    show,
    loading,
    editing: showExists ? show._id : null,
  };
}, ShowPage);
