import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { equal } = Ember.computed;

export default Model.extend({
  date:                 attr('date', {defaultValue: moment().format('MM-DD-YYYY')}),
  submittedAt:          attr('date'),
  creditNoteNumber:     attr('string'),
  xeroState:            attr('string'),

  location:             belongsTo('location'),
  fulfillment:          belongsTo('fulfillment'),
  creditNoteItems:      hasMany('credit-note-item'),

  pending:              equal('xeroState', 'pending'),
  submitted:            equal('xeroState', 'submitted'),

  creditNoteItemForItem(item) {
    return this.get('creditNoteItems').find(cni => cni.get('item.id') === item.get('id'));
  }
});
