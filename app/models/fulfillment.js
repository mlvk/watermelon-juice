import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import computed from 'ember-computed-decorators';
import { belongsTo } from "ember-data/relationships";

const {
  equal,
  not,
  alias
} = Ember.computed;

export default Model.extend({
  deliveryState:          attr("string"),
  submittedAt:            attr("date"),

  routeVisit:             belongsTo("route-visit"),
  order:                  belongsTo("order"),
  stock:                  belongsTo("stock"),
  creditNote:             belongsTo("credit-note"),
  pod:                    belongsTo("pod"),

  location:               alias("order.location"),

  pending:                equal("deliveryState", "pending"),
  fulfilled:              not("pending"),

  belongsToSalesOrder:    alias("order.isSalesOrder"),
  belongsToPurchaseOrder: not("belongsToSalesOrder"),

  hasSignature:           alias("pod.isValid"),

  @computed('pod.isValid', 'stock.tracked', 'order.isPurchaseOrder')
  isSubmissible(isPodValid, isStockTracked, isPurchaseOrder) {
    return (isPodValid && isStockTracked) || (isPurchaseOrder && isPodValid);
  }
});
