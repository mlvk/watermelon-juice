import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

const {
  run
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  async afterModel(model) {
    await this.prepareStock(model);
  },

  async prepareStock(fulfillment) {
    const products = this.store
      .peekAll("item")
      .sortBy('position')
      .filter(item => item.get("isActive"))
      .filter(item => item.get("isProduct"));

    if(fulfillment.belongsTo("stock").id() || fulfillment.belongsTo("stock").value()) {
      const stock = await fulfillment.get("stock");
      const stockLevels = await stock.get("stockLevels");

      const missingItems = products
        .filter(item => Ember.isNone(stockLevels.find(sl => sl.belongsTo("item").id() === item.get("id"))));

      return Promise.all(missingItems
        .map(item => run(() => this.store.createRecord("stock-level", {stock, item}))));
    }
  }
});
