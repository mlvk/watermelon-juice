import Ember from 'ember';

const { bool, notEmpty } = Ember.computed;

export default Ember.Component.extend({
  identification: 'admin@wutang.com',
  password: 'password1',

  hasErrors: notEmpty("errors"),
  isLoading: bool("loading"),

  actions: {
    submit() {
      this.set("loading", true);
      this.set("errors", undefined);

      this.attrs.authenticate(this.get("identification"), this.get("password"))
        .then(() => {
          this.set("loading", false);
        })
        .catch(e => {
          this.set("loading", false);
          this.set("errors", e);
        })
    }
  }
});
