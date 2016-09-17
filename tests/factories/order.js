import FactoryGuy from 'ember-data-factory-guy';
import OrderTypes from "watermelon-juice/constants/order-types";

FactoryGuy.define('order', {
  default: {
    deliveryDate: moment().add(1, 'days').format('YYYY-MM-DD'),
    location: FactoryGuy.belongsTo('location'),
    orderItems: FactoryGuy.hasMany('order-item', 10)
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
