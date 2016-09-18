import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";

const {
  equal,
  not,
  alias
} = Ember.computed;

export default Model.extend({
  deliveryState:        attr("string"),
  notificationState:    attr("string"),
  submittedAt:          attr("date"),

  routeVisit:           belongsTo("route-visit"),
  order:                belongsTo("order"),
  stock:                belongsTo("stock"),
  creditNote:           belongsTo("credit-note"),
  pod:                  belongsTo("pod"),

  pending:              equal("deliveryState", "pending"),
  fulfilled:            not("pending"),

  belongsToSalesOrder:  alias("order.isSalesOrder"),

  prepareStock() {
    const location = this.get("order.location");
    const itemDesires = location.get("itemDesires");

    if(this.belongsTo("stock").id() || this.belongsTo("stock").value()) {
      const stock = this.get("stock");
      const missingItemDesires = itemDesires
        .filter(itemDesire => itemDesire.get("enabled"))
        .filter(itemDesire =>
          !stock.get("stockLevels")
            .find(sl => sl.get("item.id") === itemDesire.get("item.id")));

      missingItemDesires
        .forEach(itemDesire => this.store.createRecord("stock-level", {stock, item:itemDesire.get("item")}));

    } else {
      const stock = this.store.createRecord("stock", {location});
      this.set("stock", stock);

      itemDesires
        .filter(itemDesire => itemDesire.get("enabled"))
        .forEach(itemDesire => this.store.createRecord("stock-level", {stock, item: itemDesire.get("item")}));
    }
  }
});
