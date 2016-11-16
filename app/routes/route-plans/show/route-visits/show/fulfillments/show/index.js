import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  remoteSync: Ember.inject.service(),

  actions: {
    track() {
      this.transitionTo("route-plans.show.route-visits.show.fulfillments.show.tracking");
    },

    review() {
      this.transitionTo("route-plans.show.route-visits.show.fulfillments.show.review");
    },

    submit(fulfillment) {
      const routeVisit = fulfillment.get("routeVisit");

      fulfillment.set("deliveryState", "fulfilled");

      if(routeVisit.get("hasMultipleFulfillments")) {
        this.transitionTo("route-plans.show.route-visits.show");
      } else {
        routeVisit.set("routeVisitState", "fulfilled");
        routeVisit.set("completedAt", moment().toDate());

        this.get("remoteSync").enqueue(routeVisit);
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

      model.prepareStock();
    }
  }
});
