import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

const ROUTE_VISIT_INCLUDES = [
  "route-visits",
  "route-visits.route-plan",
  "route-visits.address",
  "route-visits.fulfillments",
  "route-visits.fulfillments.pod",
  "route-visits.fulfillments.pod.fulfillment",
  "route-visits.fulfillments.route-visit",
  "route-visits.fulfillments.stock",
  "route-visits.fulfillments.stock.fulfillment",
  "route-visits.fulfillments.stock.stock-levels",
  "route-visits.fulfillments.stock.stock-levels.item",
  "route-visits.fulfillments.credit-note",
  "route-visits.fulfillments.credit-note.fulfillment",
  "route-visits.fulfillments.credit-note.credit-note-items",
  "route-visits.fulfillments.credit-note.credit-note-items.item",
  "route-visits.fulfillments.order",
  "route-visits.fulfillments.order.fulfillment",
  "route-visits.fulfillments.order.order-items",
  "route-visits.fulfillments.order.order-items.item",
  "route-visits.fulfillments.order.location",
  "route-visits.fulfillments.order.location.address",
  "route-visits.fulfillments.order.location.item-desires",
  "route-visits.fulfillments.order.location.item-desires.item",
  "route-visits.fulfillments.order.location.item-credit-rates",
  "route-visits.fulfillments.order.location.item-credit-rates.item",
  "route-visits.fulfillments.order.location.company",
  "route-visits.fulfillments.order.location.company.price-tier",
  "route-visits.fulfillments.order.location.company.price-tier.item-prices",
  "route-visits.fulfillments.order.location.company.price-tier.item-prices.item"
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  remoteSync: Ember.inject.service(),

  model(params) {
    return this.store
      .query("item", {"filter[is_sold]":true})
      .then(() => this.store.findRecord("route-plan", params.route_plan_id, {include:ROUTE_VISIT_INCLUDES.join(","), reload: true}));
  },

  afterModel() {
    return this.get("remoteSync").loadFromLS();
  },

  actions: {
    didTransition() {
      this.navigator.requestReverse("route-plans.index");
    }
  }
});
