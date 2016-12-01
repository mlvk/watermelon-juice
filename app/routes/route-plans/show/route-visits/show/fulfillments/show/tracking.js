import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  async model() {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

    await this.prepareStock(fulfillment);

    return fulfillment;
  },

  async prepareStock(fulfillment) {
    const products = this.store
      .peekAll("item")
      .filter(item => item.get("isProduct"));

    if(fulfillment.belongsTo("stock").id() || fulfillment.belongsTo("stock").value()) {
      const stock = await fulfillment.get("stock");
      const stockLevels = await stock.get("stockLevels");
      const stockLevelItems = await Promise.all(stockLevels.map(sl => sl.get("item")));

      const missingItems = products
        .filter(item => Ember.isNone(stockLevelItems.find(sli => sli === item)));

      missingItems
        .forEach(async item => {
          await Ember.run(async () => {
            await this.store.createRecord("stock-level", {stock, item});
          });
        });
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
