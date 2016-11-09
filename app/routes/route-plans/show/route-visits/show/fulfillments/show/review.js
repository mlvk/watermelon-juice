import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  remoteSync: Ember.inject.service(),

  async model() {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

    await this.syncCreditNote(fulfillment);

    if(!fulfillment.belongsTo('pod').id()) {
      const pod = this.store.createRecord('pod');
      fulfillment.set('pod', pod);
    }

    return fulfillment;
  },

  async syncCreditNote(fulfillment) {
    const order = await fulfillment.get('order'),
          location = await order.get('location'),
          stockLevels = await fulfillment.get("stock.stockLevels");

    let creditNote = await fulfillment.get("creditNote");

    if(Ember.isNone(creditNote)) {
      await Ember.run(async () => {
        creditNote = await this.store.createRecord('credit-note', {fulfillment, location});
      });
    }

    const creditNoteItems = await creditNote.get("creditNoteItems");

    stockLevels.forEach(async sl => {
      const match = creditNoteItems.find(cni => sl.get("item.id") === cni.get("item.id"));

      if(match) {
        const currentQuantity = sl.get("quantity"),
              stockLevelQuantity = sl.get("returns");

        if(currentQuantity !== stockLevelQuantity) {
          match.set("quantity", sl.get("returns"));
        }
      } else {
        const item = sl.get("item"),
              rate = await location.creditRateForItem(item),
              quantity = sl.get("returns");

        await Ember.run(async () => {
          await this.store.createRecord('credit-note-item', {
            creditNote,
            item,
            unitPrice:rate,
            quantity
          });
        });
      }
    });
  },

  actions: {
    onSignature(signature, name, signedAt) {
      const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
      fulfillment.get('pod').setProperties({signature, name, signedAt});
      fulfillment.set('deliveryState', 'pending');
      fulfillment.set('routeVisit.routeVisitState', 'pending');
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
      this.navigator.requestReverse('route-plans.show.route-visits.show.fulfillments.show');
    }
  }
});
