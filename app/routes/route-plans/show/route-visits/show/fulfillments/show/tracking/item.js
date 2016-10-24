import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, dto) {
    controller.set("fulfillment", dto.fulfillment);
    controller.set("item", dto.item);
    controller.set("stockLevel", dto.stockLevel);
  },

  async model(params) {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
    const item = this.store.peekRecord('item', params.item_id);

    const stockLevel = await this.prepStockLevel(fulfillment, item);

    return {
      fulfillment,
      item,
      stockLevel
    };
  },

  actions: {
    startingChanged(stockLevel, fulfillment, val) {
      stockLevel.set('starting', val);
      stockLevel.set('trackingState', 'pending');
      fulfillment.set('deliveryState', 'pending');
      fulfillment.set('routeVisit.routeVisitState', 'pending');
    },

    returnsChanged(stockLevel, fulfillment, val) {
      stockLevel.set('returns', val);

      stockLevel.set('trackingState', 'pending');
      fulfillment.set('deliveryState', 'pending');
      fulfillment.set('routeVisit.routeVisitState', 'pending');
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.route-visits.show.fulfillments.show.tracking.index');
    },

    markCompleted(stockLevel) {
      stockLevel.set('trackingState', 'tracked');

      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show.tracking');
    }
  },

  async prepStockLevel(fulfillment, item) {
    const location = await fulfillment.get('order.location');

    let stock = await fulfillment.get("stock");

    if(Ember.isNone(stock)) {
      await Ember.run(async () => {
        stock = await this.store.createRecord('stock', {fulfillment, location});
      });
    }

    const stockLevels = await stock.get('stockLevels');
    let match = stockLevels
      .find(sl => sl.get('item.id') === item.get('id'));

    if(Ember.isNone(match)) {
      await Ember.run(async () => {
        match = await this.store.createRecord('stock-level', {stock, item});
      });
    }

    return match;
  }

});
