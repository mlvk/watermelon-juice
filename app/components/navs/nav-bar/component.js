import Ember from "ember";

const {
  computed: {
    alias,
    bool
  },
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  classNames: ["row"],
  classNameBindings: ["shouldDisplay::hidden"],

  navigator: service(),

  hasRoute: bool("navigator.hasRoute"),
  shouldDisplay: alias("hasRoute"),

  actions: {
    goBack() {
      this.get("navigator").goBack();
    }
  }
});
