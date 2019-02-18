import Component from '@ember/component';
import { gt } from '@ember/object/computed';
import moment from "moment";
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ["col", "stretch", "card-1"],
  isEditing: false,

  validOrderitems: computed("model.orderItems", function(){
    const orderItems = this.get("model.orderItems");
    return orderItems
      .filter(orderItem => orderItem.get("quantity") > 0);
  }),

  total: computed("validOrderitems.@each.{total}", "model.shipping", function(){
    const orderItems = this.get("validOrderitems");
    const shipping = this.get("model.shipping") || 0;

    return orderItems.reduce((acc, cur) => acc + cur.get("total"), shipping);
  }),

  date: computed("model.deliveryDate", function(){
    const deliveryDate = this.get("model.deliveryDate");
    return moment(deliveryDate, "YYYY-MM-DD").format("MM/DD/YYYY");
  }),

  title: computed("model.isSalesOrder", function(){
    const isSalesOrder = this.get("model.isSalesOrder");
    return isSalesOrder? "Invoice": "Purchase Order";
  }),

  hasShipping: gt("model.shipping", 0)
});
