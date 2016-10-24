import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
        this.navigator.requestReverse("route-plans.show.index");
      }

      // Prepare stock
      model.prepareStock();
    }
  }
});
