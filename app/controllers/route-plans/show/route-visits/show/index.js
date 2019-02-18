import Controller from '@ember/controller';
import { notEmpty } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  hasTempSignature: notEmpty("tempSignature"),

  canSubmit: computed("model.fulfillments.@each.fulfilled", function() {
    const fulfillments = this.get("model.fulfillments");
    return fulfillments.every(f => f.get("fulfilled"));
  })
});
