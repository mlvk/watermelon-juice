import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  sortedStockLevels: computed("model.@each.{itemPosition}", function() {
    const stockLevels = this.get("model");
    return stockLevels.sortBy("itemPosition");
  })
});
