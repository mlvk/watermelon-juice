import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("order-item", {
  default: {
    quantity: 10,
    unitPrice: 5
  }
});
