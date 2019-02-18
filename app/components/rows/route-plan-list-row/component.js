import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from 'moment';
import Clickable from 'watermelon-juice/mixins/clickable';

export default Component.extend(Clickable, {
  classNames: ['row', 'card-1'],

  isToday: equal('date', moment().format('dddd - MMM Do')),

  date: computed('model.{date}', function() {
    const date = this.get("model.date");
    return moment(date, 'YYYY-MM-DD').format('dddd - MMM Do');
  })
});
