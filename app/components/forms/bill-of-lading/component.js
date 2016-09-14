import Ember from "ember";
import computed from "ember-computed-decorators";
import moment from "moment";

export default Ember.Component.extend({
  classNames: ["col", "stretch", "card-1"],

  @computed("model.orderItems")
  validOrderitems(orderItems) {
    return orderItems
      .filter(orderItem => orderItem.get("quantity") > 0);
  },

  @computed("validOrderitems.@each.{total}")
  total(orderItems) {
    return orderItems.reduce((acc, cur) => acc + cur.get("total"), 0);
  },

  @computed("model.deliveryDate")
  date(deliveryDate) {
    return moment(deliveryDate, "YYYY-MM-DD").format("MM/DD/YYYY");
  },

  @computed("model.isSalesOrder")
  title(isSalesOrder) {
    return isSalesOrder? "Invoice": "Purchase Order";
  }
});
