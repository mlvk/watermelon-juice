import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias } = Ember.computed;

export default Model.extend({
  name:                 attr('string'),
  code:                 attr('string'),
  deliveryRate:         attr('number',  { defaultValue: 10 }),
  active:               attr('boolean', { defaultValue: true }),

  address:              belongsTo('address'),
  company:              belongsTo('company'),
  itemDesires:          hasMany('item-desire'),
  itemCreditRates:      hasMany('item-credit-rate'),
  orders:               hasMany('order'),
  stocks:               hasMany('stock'),
  creditNotes:          hasMany('credit-note'),
  visitDays:            hasMany('visit-day'),

  visitWindows:         alias('address.visitWindows'),
  lat:                  alias('address.lat'),
  lng:                  alias('address.lng'),

  async priceForItem(item) {
    const priceTier = await this.get('company.priceTier');
    const itemPrices = await priceTier.get('itemPrices');

    const match = itemPrices.find(async itemPrice => {
      const itemId = await itemPrice.get('item.id');
      return itemId === item.get('id');
    });

    if(match) {
      return match.get('price');
    } else {
      return 0;
    }
  },

  creditRateForItem(item) {
    const match = this.get('itemCreditRates').find(icr => icr.get('item.id') === item.get('id'));

    if(match) {
      return match.get('rate');
    } else {
      return 0;
    }
  },

  hasCreditForItem(item) {
    return this.creditRateForItem(item) > 0;
  }
});
