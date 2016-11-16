import Ember from "ember";
import computed from "ember-computed-decorators";

export default Ember.Controller.extend({
  @computed("model.stock.stockLevels.@each.{tracked}")
  trackingCompleted(stockLevels) {
    return stockLevels.every(sl => sl.get("tracked"));
  }
});
