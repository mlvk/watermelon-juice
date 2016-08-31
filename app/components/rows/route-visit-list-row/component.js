import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Clickable from 'watermelon-juice/mixins/clickable';

const {
  bool,
  alias,
  gt
} = Ember.computed;

export default Ember.Component.extend(Clickable, {
  classNames: ['row', 'card-1'],
  classNameBindings: ['completed'],

  @computed('index')
  formattedIndex(index) {
    return index + 1;
  },

  fulfillments: alias('model.fulfillments'),
  firstLocation: alias('fulfillments.firstObject.order.location'),
  company: alias('firstLocation.company'),

  hasMultipleFulfillments: gt('fulfillments.length', 1),

  @computed('hasMultipleFulfillments', 'company.name', 'firstLocation.name', 'firstLocation.id')
  title(hasMultiple, companyName, locationName, locationId) {
    return hasMultiple ? `${companyName} - Multiple orders` : `${companyName} - ${locationName} - ${locationId}`;
  },

  address: alias('model.address.full'),

  // companyName: alias('model.ful.location.company.name'),
  // companyAddress: alias('model.visitWindow.location.address.street'),
  // companyCity: alias('model.visitWindow.location.address.city'),

  completed: bool('model.isFulfilled')
});
