import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("stock-level", {
  default: {
    starting:     0,
    returns:      0,

    item: FactoryGuy.belongsTo("item")
  }
});
