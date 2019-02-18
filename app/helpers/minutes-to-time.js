import { helper as buildHelper } from '@ember/component/helper';
import { minutesToTime } from 'watermelon-juice/utils/time';

export function helper(params) {
  return params.map(minutesToTime);
}

export default buildHelper(helper);
