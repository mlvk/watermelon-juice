import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  actions: {
    showRouteVisit(routeVisit) {
      if(routeVisit.get('hasMultipleFulfillments')) {
        this.transitionTo('route-plans.show.route-visits.show', routeVisit.get('id'));
      } else {
        this.transitionTo('route-plans.show.route-visits.show.fulfillments.show', routeVisit.get('id'), routeVisit.get('defaultFulfillment.id'));
      }
    }
  }
});
