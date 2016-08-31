import Ember from 'ember';
import { minutesToTime } from 'watermelon-juice/utils/time';

export function helper(params) {
  return params.map(minutesToTime);
}

export default Ember.Helper.helper(helper);
