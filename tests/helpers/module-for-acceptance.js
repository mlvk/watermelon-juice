import EmberObject from '@ember/object';
import { module } from 'qunit';
import { Promise } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import {
  mockSetup,
  mockTeardown,
  mockFindAll
} from 'ember-data-factory-guy';

const MockRemoteSync = EmberObject.extend({
  start(){},
  loadFromLS(){},
  enqueue(){}
});

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      mockSetup();

      this.application.register('service:test-remote-sync', MockRemoteSync);
      this.application.inject('route', 'remoteSync', 'service:test-remote-sync');
      this.application.inject('controller', 'remoteSync', 'service:test-remote-sync');
      this.application.inject('component', 'remoteSync', 'service:test-remote-sync');

      mockFindAll("item");

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
