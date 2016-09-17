import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("fulfillment", {
  traits: {
    withRouteVisit: {
      routeVisit: FactoryGuy.belongsTo("route-visit")
    },

    withOrder: {
      order: FactoryGuy.belongsTo("order", "salesOrder")
    },

    withPurchaseOrder: {
      order: FactoryGuy.belongsTo("order", "purchaseOrder")
    }
  }
});
