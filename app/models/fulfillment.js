import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import computed from 'ember-computed-decorators';
import { belongsTo } from "ember-data/relationships";

const {
  get
} = Ember;

const {
  equal,
  not,
  alias
} = Ember.computed;

export default Model.extend({
  deliveryState:          attr("string"),
  submittedAt:            attr("date"),

  routeVisit:             belongsTo("route-visit"),
  order:                  belongsTo("order"),
  stock:                  belongsTo("stock"),
  creditNote:             belongsTo("credit-note"),
  pod:                    belongsTo("pod"),

  location:               alias("order.location"),

  pending:                equal("deliveryState", "pending"),
  fulfilled:              not("pending"),

  belongsToSalesOrder:    alias("order.isSalesOrder"),
  belongsToPurchaseOrder: not("belongsToSalesOrder"),

  hasSignature:           alias("pod.isValid"),

  @computed('pod.isValid', 'stock.tracked', 'order.isPurchaseOrder')
  isSubmissible(isPodValid, isStockTracked, isPurchaseOrder) {
    return (isPodValid && isStockTracked) || (isPurchaseOrder && isPodValid);
  },

  async syncDependencies() {
    const creditNote = await get(this, 'creditNote'),
          creditNoteItems = await get(this, "creditNote.creditNoteItems"),
          stockLevels = await get(this, "stock.stockLevels"),
          location = await get(this, "location"),
          store = get(this, "store");

    if(Ember.isPresent(stockLevels)){
      stockLevels.forEach(async sl => {
        const match = creditNoteItems.find(cni => sl.get("item.id") === cni.get("item.id"));

        if(match) {
          match.set("quantity", sl.get("returns"));
        } else {
          const item = await sl.get("item"),
                creditRate = await location.creditRateForItem(item),
                quantity = sl.get("returns");

          await Ember.run(async () => {
            await store.createRecord('credit-note-item', {
              creditNote,
              item,
              unitPrice: creditRate,
              quantity
            });
          });
        }
      });
    }
  }
});
