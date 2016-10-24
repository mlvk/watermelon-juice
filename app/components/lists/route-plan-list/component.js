import Ember from 'ember';

const {
  notEmpty
} = Ember.computed;

export default Ember.Component.extend({
  hasRoutePlans: notEmpty("model")
});
