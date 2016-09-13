import Ember from 'ember';
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  @computed("model.stockLevels.@each.{itemPosition}")
  sortedStockLevels(stockLevels) {
    return stockLevels.sortBy("itemPosition");
  }
});
