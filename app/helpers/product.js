import { helper as buildHelper } from '@ember/component/helper';

export function product(params) {
  return params.reduce((acc, cur) => acc * cur, 1);
}

export default buildHelper(product);
