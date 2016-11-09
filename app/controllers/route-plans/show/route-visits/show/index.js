import Ember from "ember";
import computed from "ember-computed-decorators";

const {
  notEmpty,
  alias
} = Ember.computed;

export default Ember.Controller.extend({
  hasTempSignature: notEmpty("tempSignature"),
  canSubmit:        alias("allFulfillmentsFulfilled"),

  @computed("model.fulfillments.@each.fulfilled")
  allFulfillmentsFulfilled(fulfillments) {
    return fulfillments.every(f => f.get("fulfilled"));
  }
});
