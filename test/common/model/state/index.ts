import { Test } from 'beater';

import { tests as createTests } from './create';
import { tests as deserializeTests } from './deserialize';
import { tests as serializeTests } from './serialize';

const tests1 = ([] as Test[])
  .concat(createTests)
  .concat(deserializeTests)
  .concat(serializeTests);

export { tests1 as tests };
