import Ember from "ember";
import computed from "ember-computed-decorators";
import Clickable from "watermelon-juice/mixins/clickable";

const {
  bool,
  alias,
  gt
} = Ember.computed;

export default Ember.Component.extend(Clickable, {
  classNames: ["row", "card-1"],
  classNameBindings: ["completed"],

  @computed("index")
  formattedIndex(index) {
    return index + 1;
  },

  fulfillments: alias("model.fulfillments"),
  firstLocation: alias("fulfillments.firstObject.order.location"),
  company: alias("firstLocation.company"),

  hasMultipleFulfillments: gt("fulfillments.length", 1),

  @computed("hasMultipleFulfillments", "firstLocation.code", "firstLocation.address.city")
  locationText(hasMultiple = false, locationCode = "", city = "") {
    return hasMultiple ? `Multiple - ${city}` : `${locationCode.toUpperCase()} - ${city}`;
  },

  address: alias("model.address.full"),

  completed: bool("model.isFulfilled")
});
