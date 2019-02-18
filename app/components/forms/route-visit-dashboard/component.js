import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  address: alias('model.visitWindow.location.address'),
  streetAddress: alias('address.street'),
  city: alias('address.city'),
  zip: alias('address.zip')
});
