import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("route-visit", {
  default: {
    fulfillments: FactoryGuy.hasMany("fulfillment", 1, "withOrderAndCreditNote"),
    visitWindow: FactoryGuy.belongsTo("visit-window")
  },

  traits: {
    withRoutePlan: {
      routePlan: FactoryGuy.belongsTo("route-plan")
    }
  }
});
