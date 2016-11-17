import Ember from 'ember';

const {
  set
} = Ember;

const ItemTracker = Ember.Component.extend({
  classNames: ['row', 'center', 'space-between'],

  didInsertElement() {
    this.$('input').on('focus', (e) => e.target.select());
  },

  willDestroyElement() {
    this.$('input').off('input', 'focus');
  },

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
