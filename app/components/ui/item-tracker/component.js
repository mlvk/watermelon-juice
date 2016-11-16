import Ember from 'ember';

const {
  set
} = Ember;

const ItemTracker = Ember.Component.extend({
  classNames: ['row', 'center', 'space-between'],

  actions: {
    cleanNumericField(key, e) {
      const parsed = parseFloat(e.target.value);
      const cleaned = _.isNaN(parsed) ? 0 : parsed;
      set(this, key, cleaned);
    }
  }
});

ItemTracker.reopenClass({
  positionalParams: ['stockLevel']
});

export default ItemTracker;
