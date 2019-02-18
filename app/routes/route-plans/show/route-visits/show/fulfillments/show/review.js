import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  actions: {
    onSignature(signature, name, signedAt) {
      const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
      fulfillment.get('pod').setProperties({signature, name, signedAt});
      fulfillment.set('deliveryState', 'pending');
      fulfillment.set('routeVisit.routeVisitState', 'pending');
    },

    goBack() {
      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show');
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.route-visits.show.fulfillments.show');
    }
  }
});
