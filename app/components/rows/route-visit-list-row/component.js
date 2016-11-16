import Ember from "ember";
import computed from "ember-computed-decorators";
import Clickable from "watermelon-juice/mixins/clickable";

const {
  bool,
  alias
} = Ember.computed;

export default Ember.Component.extend(Clickable, {
  classNames:         ["row", "card-1"],
  classNameBindings:  ["completed"],

  fulfillments:       alias("model.fulfillments"),
  firstLocation:      alias("fulfillments.firstObject.order.location"),
  company:            alias("firstLocation.company"),
  address:            alias("model.address.full"),
  completed:          bool("model.fulfilled"),

  @computed("model.hasMultipleFulfillments", "firstLocation.code", "firstLocation.address.city")
  locationText(hasMultiple = false, locationCode = "", city = "") {
    return hasMultiple ? `Multiple - ${city}` : `${locationCode.toUpperCase()} - ${city}`;
  }
});
