import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const SALES_ORDER = 'sales-order';
const PURCHASE_ORDER = 'purchase-order';

export default Model.extend({
  orderNumber:        attr('string'),
  submittedAt:        attr('date'),
  orderType:          attr('string'),

  // TODO: Should this be type date?
  deliveryDate:       attr('string'),
  shipping:           attr('number'),

  location:           belongsTo('location'),
  orderItems:         hasMany('order-item'),
  fulfillment:        belongsTo('fulfillment'),

  isSalesOrder:       equal('orderType', SALES_ORDER),
  isPurchaseOrder:    equal('orderType', PURCHASE_ORDER),

  empty: computed('orderItems.@each.{quantity}', function() {
    const orderItems = this.get("orderItems");
    return orderItems.every(so => so.get('empty'));
  })
});
