// Utilities
import React from 'react';
import { _ } from 'meteor/underscore';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { displayError } from '../helpers/errors.js';
import t from 'tcomb-form';
import i18nES from 'tcomb-form/lib/i18n/es';

// API
import { insert } from '../../api/shows/methods.js';
import { showSchema, defaultFormOptions } from '../../api/shows/shows.js';
import { allCountriesFactory } from '../../api/countries/countries.js';
import { interestsCheckboxFactory } from '../../api/interests/interests.js';
import { allLanguagesFactory, existingLanguagesFactory } from '../../api/languages/languages.js';
import { insert as insertProfile } from '../../api/profiles/methods.js';

const Form = t.form.Form;

class ShowAdd extends React.Component {
  constructor(props) {
    super(props);

    const { locale } = this.props.intl;

    this.state = {
      name: this.props.defaultName,
      author: [null],
    };

    this.throttledAdd = _.throttle(newShow => {
      if (newShow) {
        const newID = insert.call({
          newShow,
          source: locale,
        }, displayError);

        return newID;
      }

      return null;
    }, 300);

    this.throttledAddProfile = _.throttle(newProfile => {
      if (newProfile) {
        const newID = insertProfile.call({
          newProfile,
        }, displayError);

        return newID;
      }

      return null;
    }, 300);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState(value);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { locale } = this.props.intl;
    const { showCallback } = this.props;

    const newShow = this.refs.form.getValue();
    if (newShow) {
      const newID = this.throttledAdd(newShow);

      const callbackShowObj = {
        _id: newID,
        name: newShow.name,
        author: newShow.author,
      };

      if (showCallback) {
        showCallback(callbackShowObj);
      } else {
        // Redirect
        this.context.router.push(`/${locale}/shows/${newID}`);
      }
    }
  }

  render() {
    const { locale } = this.props.intl;
    const formOptions = defaultFormOptions();

    formOptions.fields.country.factory = allCountriesFactory(locale, true);
    formOptions.fields.interests.factory = interestsCheckboxFactory(locale);
    formOptions.fields.languages.factory = allLanguagesFactory(locale);

    switch (locale) {
      case 'es':
        Form.i18n = i18nES;
        break;
      default:
        // Use default tcomb settings
        break;
    }

    return (
      <form className="show-edit-form" onSubmit={this.handleSubmit} autoComplete="off" >
        <h1>
          <FormattedMessage
            id="show.showAddPageTitle"
            description="Heading above affiliation form on events"
            defaultMessage="Add a New Show"
          />
        </h1>
        <Form
          ref="form"
          type={showSchema}
          options={formOptions}
          value={this.state}
          onChange={this.onChange}
        />
        <div className="form-group">
          <button
            type="submit"
            className="edit-show-save"
          >
            <FormattedMessage
              id="show.showAddSubmit"
              description="Submit button for Events Add form"
              defaultMessage="Create Show"
            />
          </button>
        </div>
      </form>
    );
  }
}

ShowAdd.propTypes = {
  showCallback: React.PropTypes.func,
  defaultName: React.PropTypes.string,
  intl: intlShape.isRequired,
};

ShowAdd.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ShowAdd);
