import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  trackingCompleted: computed("model.stock.stockLevels.@each.{tracked}", function() {
    const stockLevels = this.get("model.stock.stockLevels");
    return stockLevels.every(sl => sl.get("tracked"));
  })
});
