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

const buildPriceTier = (items, price) => {
  const priceTier = make("price-tier");
  items.forEach((item, index) => {
    let nextPrice = price || index + 1;
    make("item-price", {item, price:nextPrice, priceTier});
  });

  return priceTier;
}

export {
  buildPriceTier
}
