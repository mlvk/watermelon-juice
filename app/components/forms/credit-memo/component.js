import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';

const { gt, filterBy } = Ember.computed;

export default Ember.Component.extend({
  classNames:         ['col', 'stretch', 'card-1'],
  classNameBindings:  ['shouldDisplay::hidden'],

  validCreditNoteItems: filterBy('model.creditNoteItems', 'hasCredit', true),
  shouldDisplay:        gt('totalCredit', 0),

  @computed('model.date')
  date(date) {
    return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY');
  },

  @computed('validCreditNoteItems.@each.{total}')
  totalCredit(creditNoteItems) {
    return creditNoteItems.reduce((acc, cur) => acc + cur.get('total'), 0);
  }

});
