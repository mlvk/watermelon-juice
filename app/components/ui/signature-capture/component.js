import Ember from "ember";

const {
  and,
  notEmpty
} = Ember.computed;

export default Ember.Component.extend({
  classNames:     ["card-2"],

  hasName:        notEmpty("stashedName"),
  hasSignature:   notEmpty("stashedSignature"),
  readyToSubmit:  and("hasName", "hasSignature"),

  didReceiveAttrs(data) {
    this.set("stashedSignature", data.newAttrs.signature.value);
    this.set("stashedName", data.newAttrs.name.value);
  },

  actions: {
    onNameChanged(e) {
      this.set("stashedName", e.target.value);
    },

    requestedSign() {
      this.set("signing", true);
    },

    cancel() {
      this.set("stashedSignature", this.get("signature"));
      this.set("signing", false);
    },

    submit() {
      this.attrs.onSignature(this.get("stashedSignature"), this.get("stashedName"), moment().toDate());
      this.set("signing", false);
    },

    handleNewSignature(data) {
      this.set("stashedSignature", data);
    }
  }
});
