import { isPresent, isNone } from '@ember/utils';
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo, hasMany } from "ember-data/relationships";
import { computed } from '@ember/object';

export default Model.extend({
  takenAt:      attr("date"),
  dayOfWeek:    attr("number"),

  location:     belongsTo("location"),
  fulfillment:  belongsTo("fulfillment"),
  stockLevels:  hasMany("stock-level"),

  tracked: computed("stockLevels.@each.{tracked}", function() {
    const records = this.get("stockLevels");
    return records.every(r => r.get("tracked"));
  }),

  sortedStockLevels: computed("stockLevels.@each.{itemPosition}", function() {
    const stockLevels = this.get("stockLevels");
    return stockLevels.sortBy("itemPosition");
  }),

  desiredItemStockLevels: computed("sortedStockLevels.@each.{itemId}", "location.itemDesires", function() {
    const stockLevels = this.get("sortedStockLevels");
    const itemDesires = this.get("location.itemDesires") || [];
    return stockLevels
      .filter(sl => {
        const match = itemDesires.find(itemDesire => itemDesire.get("item.id") === sl.get("item.id"));
        return isPresent(match);
      });
  }),

  extraItemStockLevels: computed("sortedStockLevels.@each.{itemId}", "desiredItemStockLevels", function() {
    const stockLevels = this.get("sortedStockLevels");
    const desiredItemStockLevels = this.get("desiredItemStockLevels") || [];
    return stockLevels
      .filter(sl => {
        const match = desiredItemStockLevels.find(desiredItemStockLevel => desiredItemStockLevel.get("item.id") === sl.get("item.id"));
        return isNone(match);
      });
  })
});
