import FactoryGuy from 'ember-data-factory-guy';
import ItemTypes from "watermelon-juice/constants/item-types";

FactoryGuy.define('item', {
  default: {
    name: FactoryGuy.generate(num => `Item ${num}`),
    description: FactoryGuy.generate(num => `Description ${num}`),
    position: FactoryGuy.generate(num => num),
    itemDesires: FactoryGuy.hasMany('item-desire'),
    itemPrices: FactoryGuy.hasMany('item-price'),
    orderItems: FactoryGuy.hasMany('order-item')
  },

  traits: {
    ingredient: {
      tag: ItemTypes.INGREDIENT
    },
    product: {
      tag: ItemTypes.PRODUCT
    }
  }
});
