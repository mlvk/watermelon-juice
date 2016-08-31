import Ember from 'ember';
import config from 'watermelon-juice/config/environment';

export default Ember.Component.extend({
  classNames: ['row'],
  tagName: 'Footer',
  gitVersion: config.currentRevision
});
