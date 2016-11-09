import Ember from "ember";
import config from 'watermelon-juice/config/environment';

const {
  empty
} = Ember.computed;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  remainingKeys: [],
  allSynced: empty("remainingKeys"),

  start() {
    setInterval(::this.processQueue, 5000);
  },

  async loadFromLS(){
    const keys = await localforage.keys();
    keys
      .forEach(async key => {
        const stash = await localforage.getItem(key);
        this.get("store").pushPayload(stash.emberData);
      });
  },

  async enqueue(routeVisit) {
    const toCache = await this.serializeRouteVisit(routeVisit);

    await localforage.setItem(routeVisit.get("id"), toCache);

    const keys = await localforage.keys();
    this.set("remainingKeys", keys);
  },

  async serializeRouteVisit(routeVisit) {
    const emberData = await this.serializeForEmberData(routeVisit);
    const apiPayload = await this.serializeForApi(routeVisit);
    return {
      emberData,
      apiPayload
    };
  },

  async serializeForEmberData(routeVisit) {
    const rv = await routeVisit;

    const data = rv.serialize({includeId: true}).data;
    const fulfillments = await rv.get("fulfillments");
    const relationshipPromises = fulfillments.map(f => {
      return [
        f.get("order"),
        f.get("order.orderItems"),
        f.get("creditNote"),
        f.get("creditNote.creditNoteItems"),
        f.get("stock"),
        f.get("stock.stockLevels"),
        f.get("pod")
      ];
    });

    const relationships = await Promise.all(relationshipPromises);

    const included = _.chain(relationships)
      .flattenDeep()
      .map(r => r.content)
      .map(r => _.isFunction(r.toArray) ? r.toArray() : r)
      .flattenDeep()
      .map(r => r.serialize({includeId: true}).data)
      .value();

    return {
      data,
      included
    };
  },

  async serializeForApi(routeVisit) {
    const fulfillments = await routeVisit.get("fulfillments");
    const fulfillmentsData = await Promise.all(fulfillments.map(::this.serializeFulfillment));

    return {
      id: routeVisit.get("id"),
      data: {
        completed_at: routeVisit.get("completedAt"),
        fulfillments: fulfillmentsData
      }
    }
  },

  async serializeFulfillment(f) {
    const order = await f.get("order");
    const orderItems = await order.get("orderItems");
    const order_items = orderItems.map(::this.serializeOrderItem);

    const creditNote = await f.get("creditNote");
    const creditNoteItems = await creditNote.get("creditNoteItems");
    const credit_note_items = creditNoteItems.map(::this.serializeCreditNoteItem);

    const stock = await f.get("stock");
    const stockLevels = await stock.get("stockLevels");
    const stock_levels = stockLevels.map(::this.serializeStockLevel);

    const pod = await f.get("pod");

    return {
      id: f.get("id"),
      order: {
        id:order.get("id"),
        order_items
      },
      credit_note: {
        id:creditNote.get("id"),
        credit_note_items
      },
      stock: {
        id:stock.get("id"),
        taken_at:moment().toDate(),
        stock_levels
      },
      pod: {
        id:pod.get("id"),
        name: pod.get("name"),
        signature: pod.get("signature"),
        signed_at: pod.get("signedAt")
      }
    }
  },

  serializeOrderItem(oi) {
    return {
      id: oi.get("id"),
      item_id: oi.get("item.id"),
      quantity: oi.get("quantity"),
      unit_price: oi.get("unitPrice")
    }
  },

  serializeCreditNoteItem(cni) {
    return {
      id: cni.get("id"),
      item_id: cni.get("item.id"),
      quantity: cni.get("quantity"),
      unit_price: cni.get("unitPrice")
    }
  },

  serializeStockLevel(sl) {
    return {
      id: sl.get("id"),
      item_id: sl.get("item.id"),
      starting: sl.get("starting"),
      returns: sl.get("returns")
    }
  },

  async processQueue() {
    if(!this.isProcessing) {
      this.isProcessing = true;

      const keys = await localforage.keys();
      this.set("remainingKeys", keys);
      const nextKey = keys[0];

      if(Ember.isNone(nextKey)){
        this.isProcessing = false;
        return;
      }

      const stash = await localforage.getItem(nextKey);
      const data = JSON.stringify(stash.apiPayload);

      this.get('session')
        .authorize('authorizer:devise', (headerName, headerValue) => {
          const options = {
            url:`${config.apiHost}/route_visits/submit`,
            data,
            headers: {
              [headerName]:headerValue,
              "Content-Type": "application/json"
            },
            type: "POST"
          };

          Ember.$.ajax(options)
            .fail(() => {
              this.isProcessing = false;
            })
            .done(async () => {
              await localforage.removeItem(nextKey);
              const remainingKeys = await localforage.keys();
              this.set("remainingKeys", remainingKeys);
              this.isProcessing = false;
            });
      });

    }
  }
});
