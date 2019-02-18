import Component from '@ember/component';
import Clickable from 'watermelon-juice/mixins/clickable';

export default Component.extend(Clickable, {
  classNames: ['row'],
  tagName: 'span',
  classNameBindings: ['disabled', 'flat:flat:card-1', 'completed']
});
