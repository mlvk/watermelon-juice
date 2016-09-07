import Ember from "ember";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  classNames: ["row", "stretch"],

  @computed("quantity", "unitPrice")
  total(quantity, unitPrice) {
    return quantity * unitPrice;
  }
});
