import { not, equal, gt, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  position:         attr('number'),
  arriveAt:         attr('number'),
  departAt:         attr('number'),
  completedAt:      attr('date'),
  routeVisitState:  attr('string'),
  date:             alias('routePlan.date'),

  fulfillments:   hasMany('fulfillment'),
  routePlan:      belongsTo('route-plan'),
  address:        belongsTo('address'),

  visitWindow:    alias('address.visitWindows.firstObject'),
  lat:            alias('address.lat'),
  lng:            alias('address.lng'),

  pending:        equal('routeVisitState', 'pending'),
  fulfilled:      not('pending'),

  hasMultipleFulfillments: gt('fulfillments.length', 1),

  defaultFulfillment: alias('fulfillments.firstObject'),

  hasPickups: computed('fulfillments.@each.{belongsToPurchaseOrder}', function() {
    const fulfillments = this.get("fulfillments");
    return fulfillments.any(f => f.get("belongsToPurchaseOrder"));
  }),

  positionFormatted: computed('position', function() {
    const position = this.get("position");
    return position + 1;
  }),

  isSubmissible: computed('fulfillments.@each.{isSubmissible}', function() {
    const fulfillments = this.get("fulfillments");
    return fulfillments.every(f => f.get("isSubmissible"));
  })
});
