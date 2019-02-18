import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ["row", "space-between"],

  directionsLink: computed("model.routeVisit.address.full", function(){
    const fullAddress = this.get("model.routeVisit.address.full");
    return `http://maps.apple.com/?daddr=${fullAddress}`
  })
});
