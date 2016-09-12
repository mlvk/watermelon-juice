import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  actions: {
    showFulfillment(fulfillment) {
      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show', fulfillment.get('id'));
    },

    submitRouteVisit() {
      const routeVisit = this.modelFor('route-plans.show.route-visits.show');
      const submittedAt = moment().toDate();
      routeVisit.get('fulfillments')
        .forEach(f => {
          if(f.get('creditNote.pending')) {
            f.get('creditNote').setProperties({xeroState:'submitted', submittedAt});
          }

          if(f.get('order.pending')) {
            f.get('order').setProperties({xeroState:'submitted', submittedAt});
          }

          f.get('stock.stockLevels').forEach(sl => sl.set('trackedState', 'tracked'));

          if(f.get('pending')) {
            f.setProperties({deliveryState: 'fulfilled', submittedAt});
          }
        });

      routeVisit.setProperties({routeVisitState: 'fulfilled', completedAt:moment().toDate()});

      this.transitionTo('route-plans.show');
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.index');
    }
  }
});
