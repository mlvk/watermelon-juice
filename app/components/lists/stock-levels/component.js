import Ember from "ember";

const {
  notEmpty
} = Ember.computed;

const StockLevels = Ember.Component.extend({
  classNames:     ["card-1"],
  classNameBindings:  ["hasStockLevels::hidden"],

  hasStockLevels: notEmpty("model")
});

StockLevels.reopenClass({
  positionalParams: ["model", "title"]
});

export default StockLevels;
