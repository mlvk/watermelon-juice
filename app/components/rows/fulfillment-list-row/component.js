import Component from '@ember/component';
import { alias, bool } from '@ember/object/computed';
import Clickable from 'watermelon-juice/mixins/clickable';

export default Component.extend(Clickable, {
  classNames:         ['row', 'card-1'],
  classNameBindings:  ['completed'],

  locationName:       alias('model.order.location.name'),
  locationCode:       alias('model.order.location.code'),

  completed:          bool('model.fulfilled')
});
