import Ember from 'ember';

const {
  set
} = Ember;

const ItemTracker = Ember.Component.extend({
  classNames: ['row', 'center', 'space-between'],

  didInsertElement() {
    this.$('input').on('click', (e) => Ember.run.debounce(() => e.target.setSelectionRange(0, 9999), 250));
    this.$('input').on('focus', (e) => Ember.run.debounce(() => e.target.setSelectionRange(0, 9999), 250));
  },

  willDestroyElement() {
    this.$('input').off('input', 'click');
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
