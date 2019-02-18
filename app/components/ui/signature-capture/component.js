import Component from '@ember/component';
import { notEmpty, and } from '@ember/object/computed';

export default Component.extend({
  classNames:     ["card-2"],

  hasName:        notEmpty("stashedName"),
  hasSignature:   notEmpty("stashedSignature"),
  readyToSubmit:  and("hasName", "hasSignature"),

  didInsertElement() {
    this.set("isEditing", false);
  },

  didReceiveAttrs() {
    this.set("stashedSignature", this.get('signature'));
    this.set("stashedName", this.get('name') );
  },

  actions: {
    onNameChanged(e) {
      this.set("stashedName", e.target.value);
    },

    requestedSign() {
      this.set("signing", true);
      this.set("isEditing", true);
    },

    cancel() {
      this.set("stashedSignature", this.get("signature"));
      this.set("signing", false);
      this.set("isEditing", false);
    },

    submit() {
      this.get("onSignature")(this.get("stashedSignature"), this.get("stashedName"), moment().toDate());
      this.set("signing", false);
      this.set("isEditing", false);
    },

    handleNewSignature(data) {
      this.set("stashedSignature", data);
    }
  }
});
