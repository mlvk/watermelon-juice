import Ember from "ember";

const fulfilledParentPredicate = x => x.get("fulfillment.fulfilled");
const fulfilledPredicate = x => x.get("hasDirtyAttributes") && !x.get("isSaving") && x.get("fulfilled");
const dirtyRecordPredicate = x => x.get("hasDirtyAttributes") && !x.get("isSaving");

export default Ember.Service.extend({
  store: Ember.inject.service(),
  allSynced: true,

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
    if(!this.get("processing")) {
      this.set("allSynced", false);
      this.set("processing", true);

      const store = this.get("store");
      let hadError = false;

      await Promise.all([
        this.saveAllOfType("pod"),
        this.saveFulfillmentRecordsOfType("stock", "stockLevels"),
        this.saveFulfillmentRecordsOfType("order", "orderItems"),
        this.saveFulfillmentRecordsOfType("credit-note", "creditNoteItems")
      ])
      .catch(() => {
        hadError = true;
      });

      await Promise.all(store.peekAll("fulfillment")
        .filter(fulfilledPredicate)
        .filter(dirtyRecordPredicate)
        .map(r => r.save()))
        .catch(() => {
          hadError = true;
        });

      await Promise.all(store.peekAll("route-visit")
        .filter(fulfilledPredicate)
        .filter(dirtyRecordPredicate)
        .map(r => r.save()))
        .catch(() => {
          hadError = true;
        });

      this.set("allSynced", !hadError);
      this.set("processing", false);
    }
  }
});
