import { Test, run } from 'beater';

import { tests as commonHandlerHistoryTests } from './common/handler/history';
import { tests as commonHandlerTitleTests } from './common/handler/title';
import { tests as commonModelEntryViewerTests } from './common/model/entry-viewer';
import { tests as serverRouteTests } from './server/route';

const tests1: Test[] = ([] as Test[])
  .concat(commonHandlerHistoryTests)
  .concat(commonHandlerTitleTests)
  .concat(commonModelEntryViewerTests)
  .concat(serverRouteTests);
run(tests1).catch(() => process.exit(1));
