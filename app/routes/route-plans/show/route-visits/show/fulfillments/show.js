import { isNone } from '@ember/utils';
import Route from '@ember/routing/route';
import { run } from '@ember/runloop';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {

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
        .filter(item => isNone(stockLevels.find(sl => sl.belongsTo("item").id() === item.get("id"))));

      return Promise.all(missingItems
        .map(item => run(() => this.store.createRecord("stock-level", {stock, item}))));
    }
  }
});
