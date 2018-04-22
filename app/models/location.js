import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias, notEmpty } = Ember.computed;

export default Model.extend({
  name:                 attr('string'),
  code:                 attr('string'),
  deliveryNote:         attr('string'),
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

  hasDeliveryNote:      notEmpty("deliveryNote"),

  async priceForItem(item) {
    const itemPrices = await this.get('company.priceTier.itemPrices');
    const match = itemPrices.find(ip => ip.belongsTo("item").id() === item.get('id'));

    return Ember.isNone(match) ? 0 : match.get("price");
  },

  async creditRateForItem(item) {
    const price = await this.priceForItem(item);
    const itemCreditRates = await this.get('itemCreditRates');
    const match = itemCreditRates.find(icr => icr.belongsTo("item").id() === item.get('id'));

    return Ember.isNone(match) ? 0 : match.get('rate') * price;
  }
});
