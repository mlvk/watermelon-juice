import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("credit-note-item", {
  default: {
    item: FactoryGuy.belongsTo("item", 1),
    quantity: 10,
    unitPrice: 5
  }
});
