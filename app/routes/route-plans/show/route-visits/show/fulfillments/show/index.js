import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";
import colors from "watermelon-juice/constants/colors";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  buildButton(icon, href){
    return {
      size:3,
      padding:0,
      flat:true,
      color:colors.DARK_GREY,
      backgroundColor:colors.TRANSPARENT,
      icon,
      href,
      disabledClick:true
    };
  },

  actions: {
    track() {
      this.transitionTo("route-plans.show.route-visits.show.fulfillments.show.tracking");
    },

    review() {
      this.transitionTo("route-plans.show.route-visits.show.fulfillments.show.review");
    },

    submitFulfillment() {
      const fulfillment = this.modelFor("route-plans.show.route-visits.show.fulfillments.show");
      fulfillment.setProperties({deliveryState: "fulfilled", submittedAt: moment().toDate()});

      if(fulfillment.belongsTo("creditNote").value()){
        fulfillment.set("creditNote.xeroState", "submitted");
      }

      fulfillment.set("order.xeroState", "submitted");
      fulfillment.set("notificationState", "awaiting");

      if(fulfillment.get("routeVisit.hasMultipleFulfillments")) {
        this.transitionTo("route-plans.show.route-visits.show");
      } else {
        fulfillment.get("routeVisit").setProperties({routeVisitState: "fulfilled", completedAt:moment().toDate()});
        this.transitionTo("route-plans.show");
      }
    },

    didTransition() {
      const model = this.modelFor("route-plans.show.route-visits.show.fulfillments.show");
      if(model.get("routeVisit.hasMultipleFulfillments")) {
        this.navigator.requestReverse("route-plans.show.route-visits.show");
      } else {
        this.navigator.requestReverse("route-plans.show");
      }

      const phoneButton = this.buildButton("phone", "tel:1111111");

      // Build directions button
      //@TODO: code for iOS
      const address = model.get("routeVisit.address");
      const lat = address.get("lat");
      const lng = address.get("lng");
      const directionHref = `geo:${lat},${lng}?q=${lat},${lng}`;
      const directionButton = this.buildButton("directions", directionHref);

      this.stateInfo.display({
        label:model.get("order.location.company.name"),
        info: `${model.get("order.location.code").toUpperCase()} - ${model.get("order.location.name")}`,
        rightButtons: [phoneButton, directionButton]
      });
    }
  }
});
