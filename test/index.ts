import { Test, run } from 'beater';

import { tests as commonHandlerHistoryTests } from './common/handler/history';
import { tests as commonHandlerRequestTests } from './common/handler/request';
import { tests as commonHandlerTitleTests } from './common/handler/title';
import { tests as commonModelTests } from './common/model';
import { tests as serverRouteTests } from './server/route';

const tests1: Test[] = ([] as Test[])
  .concat(true ? [] : commonHandlerHistoryTests) // skip tests
  .concat(commonHandlerRequestTests)
  .concat(commonHandlerTitleTests)
  .concat(commonModelTests)
  .concat(serverRouteTests);
run(tests1).catch(() => process.exit(1));
