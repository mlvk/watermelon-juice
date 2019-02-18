import Component from '@ember/component';
import { lt } from '@ember/object/computed';

export default Component.extend({
  classNames: ['col', 'card-2'],

  cannotDecrement: lt('value', 1),

  didInsertElement() {
    this.$('input').on('input', (e) => this._setValue(e.target.value));
    this.$('input').on('focus', (e) => e.target.select());
    this.$('input').on('blur', () => {
      if(!Number.isInteger(parseInt(this.get('value'), 10))) {
        this._resetInput();
      }
    });
  },

  willDestroyElement() {
    this.$('input').off('input', 'focus');
  },

  _resetInput() {
    this._setValue(0);
    this.$('input').val('0');
  },

  _setValue(value) {
    const parsedValue = parseInt(value, 10);
    if(Number.isInteger(parsedValue)) {
      this.get("valueChanged")(parsedValue);
    }
  },

  actions: {
    change(delta) {
      this.$('input').blur();

      const newVal = parseInt(this.get('value'), 10) + parseInt(delta, 10);
      this._setValue(newVal);
    }
  }
});
