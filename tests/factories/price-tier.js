import FactoryGuy from 'ember-data-factory-guy';
import {
  make
} from 'ember-data-factory-guy';

FactoryGuy.define('price-tier', {
  default: {
    name: FactoryGuy.generate(num => `Price Tier ${num}`),
    companies: FactoryGuy.hasMany('company'),
    itemPrices: FactoryGuy.hasMany('item-price')
  }
});

const buildPriceTier = (items, { price = 10 }) => {
  const priceTier = make("price-tier");
  items.forEach(item => make("item-price", {item, price, priceTier}));

  return priceTier;
}

export {
  buildPriceTier
}
