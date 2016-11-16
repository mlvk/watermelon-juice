import Ember from 'ember';

const StockLevels = Ember.Component.extend({
  classNames: ["card-1"]
});

StockLevels.reopenClass({
  positionalParams: ['model']
});

export default StockLevels;
