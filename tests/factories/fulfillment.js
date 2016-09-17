import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("fulfillment", {
  default: {
    stock: FactoryGuy.belongsTo("stock", "withStockLevels")
  },

  traits: {
    withRouteVisit: {
      routeVisit: FactoryGuy.belongsTo("route-visit")
    },

    withOrder: {
      order: FactoryGuy.belongsTo("order", "salesOrder")
    },

    withPurchaseOrder: {
      order: FactoryGuy.belongsTo("order", "purchaseOrder")
    },

    withOrderAndCreditNote: {
      order: FactoryGuy.belongsTo("order", "salesOrder"),
      creditNote: FactoryGuy.belongsTo("credit-note")
    }
  }
});
