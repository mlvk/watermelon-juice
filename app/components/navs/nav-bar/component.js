import Ember from "ember";

const {
  computed: {
    alias,
    bool,
    or
  },
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  classNames: ["row"],
  classNameBindings: ["shouldDisplay::hidden"],

  stateInfo: service(),
  navigator: service(),

  label: alias("stateInfo.label"),
  info: alias("stateInfo.info"),
  hasStateInfo: bool("stateInfo.hasData"),
  hasRoute: bool("navigator.hasRoute"),
  shouldDisplay: or("hasRoute", "hasStateInfo"),
  rightButtons: alias("stateInfo.rightButtons"),

  actions: {
    goBack() {
      this.get("navigator").goBack();
    }
  }
});
