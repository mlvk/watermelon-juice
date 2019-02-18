import Component from '@ember/component';
import { set } from '@ember/object';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ["row", "stretch", "center"],

  total: computed("quantity", "unitPrice", function() {
    const quantity = this.get("quantity");
    const unitPrice = this.get("unitPrice");
    return quantity * unitPrice;
  }),

  formattedIndex: computed('index', function() {
    const index = this.get("index");
    return S(index + 1).padLeft(2, "0").s;
  }),

  actions: {
    cleanNumericField(key, e) {
      const parsed = parseFloat(e.target.value);
      const cleaned = _.isNaN(parsed) ? 0 : parsed;
      set(this, key, cleaned);
    }
  }
});
