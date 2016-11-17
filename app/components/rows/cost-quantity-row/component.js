import Ember from "ember";
import computed from "ember-computed-decorators";

const {
  set
} = Ember;

export default Ember.Component.extend({
  classNames: ["row", "stretch", "center"],

  @computed("quantity", "unitPrice")
  total(quantity, unitPrice) {
    return quantity * unitPrice;
  },

  @computed('index')
  formattedIndex(index) {
    return S(index + 1).padLeft(2, "0").s;
  },

  actions: {
    cleanNumericField(key, e) {
      const parsed = parseFloat(e.target.value);
      const cleaned = _.isNaN(parsed) ? 0 : parsed;
      set(this, key, cleaned);
    }
  }
});
