import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("stock", {
  default: {
    takenAt:      new Date(),
    dayOfWeek:    2
  },

  traits: {
    withStockLevels: {
      stockLevels: FactoryGuy.hasMany("stock-level", 1)
    }
  }
});
