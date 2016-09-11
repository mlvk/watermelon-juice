import Ember from "ember";

const {
  and,
  notEmpty
} = Ember.computed;

export default Ember.Component.extend({
  classNames:     ["card-2"],

  hasName:        notEmpty("tempName"),
  hasSignature:   notEmpty("signature"),
  readyToSubmit:  and("hasName", "tempSignature"),

  actions: {
    onNameChanged(e) {
      this.set("tempName", e.target.value);
    },

    requestedSign() {
      this.setProperties({signing:true, tempSignature:undefined, tempName: this.get("name")});
    },

    cancel() {
      this.setProperties({signing:false, tempSignature:undefined});
    },

    submit() {
      this.attrs.onSignature(this.get("tempSignature"), this.get("tempName"), moment().toDate());
      this.setProperties({signing:false, tempSignature:undefined, tempName:""});
    },

    handleNewSignature(data) {
      this.set("tempSignature", data);
    }
  }
});
