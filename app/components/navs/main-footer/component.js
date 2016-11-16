import Ember from 'ember';
import config from 'watermelon-juice/config/environment';

export default Ember.Component.extend({
  classNames:         ['row'],
  classNameBindings:  ["remoteSync.allSynced::syncing"],
  tagName:            'Footer',
  gitVersion:         config.currentRevision,
  remoteSync:         Ember.inject.service()
});
