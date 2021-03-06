import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Countries } from './countries.js';

export const upsert = new ValidatedMethod({
  name: 'countries.upsert',
  validate: new SimpleSchema({
    country: { type: String },
  }).validator(),
  run({ country }) {
    if (!this.userId) {
      throw new Meteor.Error('countries.upsert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    // @TODO: Replace this with function to update profile, show, or event fields
    // on country record instead
    // const countryObject = {
    //   label: country,
    //   value: country
    // }
    // return Countries.upsert(countryObject, countryObject);
  },
});

// Get country of all method names on Countries
const COUNTRIES_METHODS = _.pluck([
  upsert,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 country operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(COUNTRIES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
