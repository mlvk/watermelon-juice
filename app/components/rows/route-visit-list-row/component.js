import Component from '@ember/component';
import { alias, bool } from '@ember/object/computed';
import { computed } from '@ember/object';
import Clickable from "watermelon-juice/mixins/clickable";

export default Component.extend(Clickable, {
  classNames:         ["row", "card-1"],
  classNameBindings:  ["completed"],

  fulfillments:       alias("model.fulfillments"),
  firstLocation:      alias("fulfillments.firstObject.order.location"),
  company:            alias("firstLocation.company"),
  address:            alias("model.address.full"),
  completed:          bool("model.fulfilled"),

  locationText: computed("model.hasMultipleFulfillments", "firstLocation.{code,address.city}", function() {
    const hasMultiple = this.get("model.hasMultipleFulfillments") || false;
    const locationCode = this.get("firstLocation.code") || "";
    const city = this.get("firstLocation.address.city") || "";
    return hasMultiple ? `Multiple - ${city}` : `${locationCode.toUpperCase()} - ${city}`;
  })
});
