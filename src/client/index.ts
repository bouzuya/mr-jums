import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { makeHistoryDriver } from '@bouzuya/cyclejs-history-driver';
import { intent } from './intent';
import { model } from '../common/model';
import { model as history$ } from '../common/handler/history';
import { model as log$ } from '../common/handler/log'; // for DEBUG
import { model as request$ } from '../common/handler/request';
import { model as state$ } from '../common/handler/state';
import { model as title$ } from '../common/handler/title';
import { view } from './view';
import { deserialize } from '../common/model/state';
import { Sinks } from './type/sinks';
import { Sources } from './type/sources';

const main = (): void => {
  if (typeof window === 'undefined') throw new Error();
  const serialized: string = document.getElementById('initial-state')!.getAttribute('data-initial-state')!;
  const initialState = deserialize(serialized);
  run(
    (sources: Sources): Sinks => view(model([
      (_) => intent(sources),
      history$,
      request$,
      (subject$) => state$(subject$, initialState),
      log$, // for DEBUG
      title$
    ])),
    {
      DOM: makeDOMDriver('#app'),
      HISTORY: makeHistoryDriver(),
      HTTP: makeHTTPDriver()
    }
  );
};

main();
