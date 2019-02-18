import { debounce } from '@ember/runloop';
import Component from '@ember/component';
import { set } from '@ember/object';

const ItemTracker = Component.extend({
  classNames: ['row', 'center', 'space-between'],

  didInsertElement() {
    this.$('input').on('click', (e) => debounce(() => e.target.setSelectionRange(0, 9999), 250));
    this.$('input').on('focus', (e) => debounce(() => e.target.setSelectionRange(0, 9999), 250));
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
