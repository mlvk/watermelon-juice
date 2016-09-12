import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
    this._prepStock(fulfillment);

    return fulfillment;
  },

  _prepStock(fulfillment) {
    const location = fulfillment.get('order.location');
    const itemDesires = location.get('itemDesires');

    if(fulfillment.belongsTo('stock').id() || fulfillment.belongsTo('stock').value()) {
      const stock = fulfillment.get('stock');
      const missingItemDesires = itemDesires
        .filter(itemDesire => itemDesire.get('enabled'))
        .filter(itemDesire =>
          !stock.get('stockLevels')
            .find(sl => sl.get('item.id') === itemDesire.get('item.id')));

      missingItemDesires
        .forEach(itemDesire => this.store.createRecord('stock-level', {stock, item:itemDesire.get('item')}));

    } else {
      const stock = this.store.createRecord('stock', {location});
      fulfillment.set('stock', stock);

      itemDesires
        .filter(itemDesire => itemDesire.get('enabled'))
        .forEach(itemDesire => this.store.createRecord('stock-level', {stock, item: itemDesire.get('item')}));
    }
  },

  actions: {
    trackItem(item) {
      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show.tracking.item', item.get('id'));
    },

    markAllCompleted() {
      const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
      fulfillment.get('stock.stockLevels')
        .forEach(sl => sl.set('trackingState', 'tracked'));

      fulfillment.get('stock').setProperties({takenAt:moment().toDate(), dayOfWeek:moment().days()});

      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show');
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.route-visits.show.fulfillments.show');
    }
  }
});
