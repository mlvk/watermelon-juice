import Ember from 'ember';
import Clickable from 'watermelon-juice/mixins/clickable';

export default Ember.Component.extend(Clickable, {
  classNames: ['row'],
  tagName: 'span',
  classNameBindings: ['disabled', 'flat:flat:card-1', 'completed']
});
