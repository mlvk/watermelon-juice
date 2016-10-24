import FactoryGuy from 'ember-data-factory-guy';
import {
  make
} from 'ember-data-factory-guy';

import OrderTypes from "watermelon-juice/constants/order-types";

FactoryGuy.define('order', {
  default: {
    deliveryDate: moment().add(1, 'days').format('YYYY-MM-DD'),
    location: FactoryGuy.belongsTo('location'),
    orderItems: FactoryGuy.hasMany('order-item')
  },

  traits: {
    salesOrder: {
      orderType: OrderTypes.SALES_ORDER
    },

    purchaseOrder: {
      orderType: OrderTypes.PURCHASE_ORDER
    }
  }
});

const buildOrderFromPriceTier = location => {
  const order = make("order", "salesOrder", {location});
  const priceTier = location.get("company.priceTier");

  priceTier.get("itemPrices")
    .forEach(ip => {
      const item = ip.get("item.content"),
            price = ip.get("price");
      make("order-item", {item, unitPrice:price, order});
    });

  return order;
}

export {
  buildOrderFromPriceTier
}
