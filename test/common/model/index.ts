import { Test } from 'beater';

import { tests as entryViewerTests } from './entry-viewer';
import { tests as stateTests } from './state';

const tests1: Test[] = ([] as Test[])
  .concat(entryViewerTests)
  .concat(stateTests);

export { tests1 as tests };
