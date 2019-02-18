import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

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
