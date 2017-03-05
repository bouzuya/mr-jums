import xs from 'xstream';
import { run } from '@cycle/run';
import { DOMSource, makeDOMDriver } from '@cycle/dom';
import { HTTPSource, makeHTTPDriver } from '@cycle/http';
import {
  HistorySource, makeHistoryDriver
} from '@bouzuya/cyclejs-history-driver';
import { intent } from './intent';
import { model } from '../common/model';
import { model as history$ } from '../common/handler/history';
import { model as request$ } from '../common/handler/request';
import { model as state$ } from '../common/handler/state';
import { model as title$ } from '../common/handler/title';
import { view } from './view';
import { deserialize } from '../common/model/state';

type MySources = {
  DOM: DOMSource;
  HISTORY: HistorySource;
  HTTP: HTTPSource;
};

type MySinks = {
  DOM: xs<any>;
};

const main = (): void => {
  const serialized: string | undefined = typeof window === 'undefined'
    ? undefined : (<any>window).INITIAL_STATE;
  const initialState = deserialize(serialized);
  run(
    (sources: MySources): MySinks => view(model([
      (_) => intent(sources),
      history$,
      request$,
      (subject$) => state$(subject$, initialState),
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
