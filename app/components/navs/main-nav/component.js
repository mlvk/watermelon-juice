import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings:  ["remoteSync.allSynced::syncing"],
  remoteSync: Ember.inject.service()
});
