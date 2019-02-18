import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';

const StockLevels = Component.extend({
  classNames:     ["card-1"],
  classNameBindings:  ["hasStockLevels::hidden"],

  hasStockLevels: notEmpty("model")
});

StockLevels.reopenClass({
  positionalParams: ["model", "title"]
});

export default StockLevels;
