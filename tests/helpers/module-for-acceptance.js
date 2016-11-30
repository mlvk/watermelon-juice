import { module } from 'qunit';
import Ember from 'ember';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import { mockSetup, mockTeardown } from 'ember-data-factory-guy';

const { RSVP: { Promise } } = Ember;

const MockRemoteSync = Ember.Object.extend({
  start(){},
  loadFromLS(){},
  enqueue(){}
});

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      mockSetup();

      // Enable for mockjax logging
      // $.mockjaxSettings.logging = true;
      // $.mockjaxSettings.logging = 4;

      this.application.register('service:test-remote-sync', MockRemoteSync);
      this.application.inject('route', 'remoteSync', 'service:test-remote-sync');
      this.application.inject('controller', 'remoteSync', 'service:test-remote-sync');
      this.application.inject('component', 'remoteSync', 'service:test-remote-sync');

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return Promise.resolve(afterEach)
        .then(() => destroyApp(this.application))
        .then(() => mockTeardown());
    }
  });
}
