import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  remoteSync: service(),

  actions: {
    showFulfillment(fulfillment) {
      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show', fulfillment.get('id'));
    },

    async submitRouteVisit(routeVisit) {
      routeVisit.set("routeVisitState", "fulfilled");
      routeVisit.set("completedAt", moment().toDate());

      await this.get("remoteSync").enqueue(routeVisit);

      this.transitionTo('route-plans.show');
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.index');
    }
  }
});
