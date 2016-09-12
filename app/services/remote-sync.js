import Ember from "ember";

const fulfilledParentPredicate = x => x.get("fulfillment.fulfilled");
const fulfilledPredicate = x => x.get("hasDirtyAttributes") && !x.get("isSaving") && x.get("fulfilled");
const dirtyRecordPredicate = x => x.get("hasDirtyAttributes") && !x.get("isSaving");

export default Ember.Service.extend({
  store: Ember.inject.service(),

  start() {
    setInterval(::this.processQueue, 5000);
  },

  async saveAllOfType(modelType) {
    const store = this.get("store");

    const records = store.peekAll(modelType)
      .filter(fulfilledParentPredicate);

    await Promise.all(records
      .filter(dirtyRecordPredicate)
      .map(r => r.save()));

    return records;
  },

  async saveFulfillmentRecordsOfType(modelType, childCollectionKey) {
    const records = await this.saveAllOfType(modelType);

    records.forEach(r => r.get(childCollectionKey)
      .filter(dirtyRecordPredicate)
      .forEach(r => r.save()));
  },

  async processQueue() {
    if(!this.processing) {
      this.processing = true;

      const store = this.get("store");

      await Promise.all([
        this.saveAllOfType("pod"),
        this.saveFulfillmentRecordsOfType("stock", "stockLevels"),
        this.saveFulfillmentRecordsOfType("order", "orderItems"),
        this.saveFulfillmentRecordsOfType("credit-note", "creditNoteItems")
      ])
      .catch(() => {});

      await Promise.all(store.peekAll("fulfillment")
        .filter(fulfilledPredicate)
        .filter(dirtyRecordPredicate)
        .map(r => r.save()))
        .catch(() => {});

      await Promise.all(store.peekAll("route-visit")
        .filter(fulfilledPredicate)
        .filter(dirtyRecordPredicate)
        .map(r => r.save()))
        .catch(() => {});

      this.processing = false;
    }
  }
});
