import Ember from 'ember';
import config from 'watermelon-juice/config/environment';

const {
  alias
} = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row'],
  classNameBindings:  ["allSyncing::syncing"],
  tagName: 'Footer',
  gitVersion: config.currentRevision,
  remoteSync: Ember.inject.service(),

  allSyncing: alias("remoteSync.allSynced")
});
