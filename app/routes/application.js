import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  remoteSync: Ember.inject.service('remote-sync'),

  activate() {
    this.get('remoteSync').start();
  }

});
