import Component from '@ember/component';
import { computed } from '@ember/object';
import Clickable from 'watermelon-juice/mixins/clickable';

export default Component.extend(Clickable, {

  classNames:         ['row', "card-1"],
  classNameBindings:  ['completed'],

  formattedIndex: computed('index', function(){
    const index = this.get("index");
    return S(index + 1).padLeft(2, "0").s;
  })
});
