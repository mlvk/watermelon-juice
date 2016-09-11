import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Clickable from 'watermelon-juice/mixins/clickable';

const {
  bool,
  alias
} = Ember.computed;

export default Ember.Component.extend(Clickable, {
  classNames:         ['row', 'card-1'],
  classNameBindings:  ['completed'],


  locationName:       alias('model.order.location.name'),
  locationCode:       alias('model.order.location.code'),

  completed:          bool('model.isFulfilled'),

  @computed('index')
  formattedIndex(index) {
    return index + 1;
  }
});
