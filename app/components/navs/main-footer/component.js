import { inject as service } from '@ember/service';
import Component from '@ember/component';
import config from '../../../config/environment';

export default Component.extend({
  classNames:         ['row'],
  classNameBindings:  ["remoteSync.allSynced::syncing"],
  tagName:            'Footer',
  gitVersion:         config.currentRevision,
  remoteSync:         service()
});
