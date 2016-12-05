import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

const {
  get,
  run
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  remoteSync: Ember.inject.service(),

  async model() {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

    await this.prepareStock(fulfillment);
    await this.syncDependencies(fulfillment);

    // console.log(what);

    return fulfillment;
  },

  async syncDependencies(fulfillment) {
    const creditNote = await get(fulfillment, 'creditNote');
    const creditNoteItems = await get(fulfillment, "creditNote.creditNoteItems");
    const stockLevels = await get(fulfillment, "stock.stockLevels");
    const location = await get(fulfillment, "location");

    if(Ember.isPresent(stockLevels) && Ember.isPresent(creditNote)){
        return Promise.all(stockLevels.map(async sl => {
          const item = await sl.get("item"),
                quantity = sl.get("returns"),
                unitPrice = await location.creditRateForItem(item),
                match = creditNoteItems.find(cni => cni.belongsTo("item").id() === item.get("id"));
          if(Ember.isNone(match)) {
            return await run(() => this.store.createRecord('credit-note-item', { creditNote, item, quantity, unitPrice}));
          } else {
            return await run(() => match.setProperties({quantity, unitPrice}));
          }
        }));
    }
  },

  async prepareStock(fulfillment) {
    const products = this.store
      .peekAll("item")
      .filter(item => item.get("isActive"))
      .filter(item => item.get("isProduct"));

    if(fulfillment.belongsTo("stock").id() || fulfillment.belongsTo("stock").value()) {
      const stock = await fulfillment.get("stock");
      const stockLevels = await stock.get("stockLevels");

      const missingItems = products
        .filter(item => Ember.isNone(stockLevels.find(sl => sl.belongsTo("item").id() === item.get("id"))));

      return Promise.all(missingItems
        .map(item => run(() => this.store.createRecord("stock-level", {stock, item}))));
    }
  },

  actions: {
    track() {
      this.transitionTo("route-plans.show.route-visits.show.fulfillments.show.tracking");
    },

    review() {
      this.transitionTo("route-plans.show.route-visits.show.fulfillments.show.review");
    },

    async submit(fulfillment) {
      const routeVisit = await fulfillment.get("routeVisit");

      fulfillment.set("deliveryState", "fulfilled");

      if(routeVisit.get("hasMultipleFulfillments")) {
        this.transitionTo("route-plans.show.route-visits.show");
      } else {
        routeVisit.set("routeVisitState", "fulfilled");
        routeVisit.set("completedAt", moment().toDate());

        Ember.run(() => {
          this.get("remoteSync").enqueue(routeVisit);
        });

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
    }
  }
});
