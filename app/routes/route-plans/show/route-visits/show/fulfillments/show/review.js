import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

    if(!fulfillment.belongsTo('pod').id()) {
      const pod = this.store.createRecord('pod');
      fulfillment.set('pod', pod);
    }

    return fulfillment;
  },

  actions: {
    onSignature(signature, name, signedAt) {
      const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
      fulfillment.get('pod').setProperties({signature, name, signedAt});
      fulfillment.set('deliveryState', 'pending');
      fulfillment.set('routeVisit.routeVisitState', 'pending');
    },

    submit() {
      const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

      if(fulfillment.belongsTo('creditNote').value()){
        fulfillment.set('creditNote.date', moment().toDate());
      }

      fulfillment.set('deliveryState', 'pending');
      fulfillment.set('routeVisit.routeVisitState', 'pending');

      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show');
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.route-visits.show.fulfillments.show');
    }
  }
});
