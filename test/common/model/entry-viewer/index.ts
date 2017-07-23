import { Test } from 'beater';

import { tests as emptyTests } from './empty';
import { tests as focusNextTests } from './focus-next';
import { tests as focusPrevTests } from './focus-prev';
import { tests as focusTests } from './focus';
import { tests as helpersNewEntryViewerTests } from './select-next';
import { tests as selectNextTests } from './select-next';
import { tests as selectPrevTests } from './select-prev';
import { tests as selectTests } from './select';

const tests1 = ([] as Test[])
  .concat(emptyTests)
  .concat(focusNextTests)
  .concat(focusPrevTests)
  .concat(focusTests)
  .concat(helpersNewEntryViewerTests)
  .concat(selectNextTests)
  .concat(selectPrevTests)
  .concat(selectTests);

export { tests1 as tests };
