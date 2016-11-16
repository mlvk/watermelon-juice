import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
        match.set("quantity", sl.get("returns"));
      } else {
        const item = await sl.get("item"),
              creditRate = await location.creditRateForItem(item),
              quantity = sl.get("returns");

        await Ember.run(async () => {
          await this.store.createRecord('credit-note-item', {
            creditNote,
            item,
            unitPrice: creditRate,
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

    goBack() {
      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show');
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.route-visits.show.fulfillments.show');
    }
  }
});
