import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  queryParams: {
    date: {
      refreshModel: true
    }
  },

  model () {
    const query = {
      "page[offset]":"0",
      "page[limit]":"3",
      "filter[user]":this.get("session.data.authenticated.id")
    };

    return this.store.query("route-plan", query);
  },

  actions: {
    selectRoutePlan(routePlan) {
      this.transitionTo("route-plans.show", routePlan.get("id"));
    },

    didTransition() {
      this.navigator.clearRoute();
    }
  }

});
