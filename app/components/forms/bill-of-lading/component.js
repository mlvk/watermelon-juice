import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['col', 'stretch', 'card-1'],

  @computed('model.orderItems')
  validOrderitems(orderItems) {
    return orderItems
      .filter(orderItem => orderItem.get('quantity') > 0);
  },

  @computed('validOrderitems.@each.{quantity}')
  totalQuantity(orderItems) {
    return orderItems.reduce((acc, cur) => acc + cur.get('quantity'), 0);
  },

  @computed('model.deliveryDate')
  date(deliveryDate) {
    return moment(deliveryDate, 'YYYY-MM-DD').format('MM/DD/YYYY');
  }
});
