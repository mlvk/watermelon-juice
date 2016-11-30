import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  async model() {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

    await Ember.run(async () => {
      await this.prepareStock(fulfillment);
    });

    return fulfillment;
  },

  async prepareStock(fulfillment) {
    const items = this.store.peekAll("item");

    if(fulfillment.belongsTo("stock").id() || fulfillment.belongsTo("stock").value()) {
      const stock = await fulfillment.get("stock");
      const stockLevels = await stock.get("stockLevels");

      const missingItems = items
        .filter(item => {
          const match = stockLevels.find(sl => sl.get("item.id") === item.get("id"));
          return Ember.isNone(match);
        });

      missingItems
        .forEach(item => this.store.createRecord("stock-level", {stock, item}));
    }
  },

  actions: {
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
