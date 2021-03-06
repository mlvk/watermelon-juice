import { alias } from '@ember/object/computed';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name:       attr('string'),
  code:       attr('string'),
  terms:      attr('number', { defaultValue: 14 }),
  creditRate: attr('number', { defaultValue: 0 }),
  tag:        attr('string', { defaultValue: 'customer' }),

  priceTier:  belongsTo('price-tier'),
  locations:  hasMany('location'),

  text:       alias('name')
});
