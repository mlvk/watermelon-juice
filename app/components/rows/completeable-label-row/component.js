import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Clickable from 'watermelon-juice/mixins/clickable';

export default Ember.Component.extend(Clickable, {

  classNames:         ['row', "card-1"],
  classNameBindings:  ['completed'],

  @computed('index')
  formattedIndex(index) {
    return S(index + 1).padLeft(2, "0").s;
  }
});
