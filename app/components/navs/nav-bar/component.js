import Component from '@ember/component';
import { bool, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
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
