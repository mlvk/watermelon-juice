import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import computed from 'ember-computed-decorators';

export default Model.extend({
  takenAt:      attr('date'),
  dayOfWeek:    attr('number'),

  location:     belongsTo('location'),
  fulfillment:  belongsTo('fulfillment'),
  stockLevels:  hasMany('stock-level'),

  @computed('stockLevels.@each.{tracked}')
  tracked(records) {
    return records.every(r => r.get('tracked'));
  },

  @computed("stockLevels.@each.{itemPosition}")
  sortedStockLevels(stockLevels) {
    return stockLevels.sortBy("itemPosition");
  }
});
