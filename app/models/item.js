import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name:             attr('string'),
  description:      attr('string'),
  position:         attr('number'),

  itemDesires:      hasMany('item-desire'),
  itemPrices:       hasMany('item-price'),
  itemCreditRates:  hasMany('item-credit-rate'),
  orderItems:       hasMany('order-item'),
  stockLevels:      hasMany('stock-level'),
  creditNoteItems:  hasMany('credit-note-item')
});
