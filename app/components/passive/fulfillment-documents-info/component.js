import Ember from 'ember';

const {
  empty,
  equal
} = Ember.computed;

const FulfillmentDocumentsInfo = Ember.Component.extend({
  classNames: ["row"],
  classNameBindings:  ["isEmpty:hidden"],

  firebaseMgr: Ember.inject.service(),
  isEmpty: empty("data.status"),
  isPending: equal("data.status", "processing"),
  isPublished: equal("data.status", "published"),

  didInsertElement() {
    const fulfillmentId = this.get("model.id");

    this.fbRef = this.get('firebaseMgr').buildRef(`fulfillment_docs/${fulfillmentId}`);

    this.fbRef.on("value", ::this.processSnapshot);
  },

  willDestroy() {
    this.fbRef.off('value');
  },

  processSnapshot(snapshot) {
    const data = snapshot.val();
    this.set("data", data);
  }
});

FulfillmentDocumentsInfo.reopenClass({
  positionalParams: ['model']
});

export default FulfillmentDocumentsInfo;
