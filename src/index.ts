import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { DOMSource, makeDOMDriver } from '@cycle/dom';
import { HTTPSource, makeHTTPDriver } from '@cycle/http';
import { HistorySource, makeHistoryDriver } from 'cyclejs-history-driver';
import { makeTitleDriver } from './client/driver/title-driver';
import { intent } from './client/intent';
import { model } from './model';
import { view } from './view';
import { deserialize } from './model/state';
import { SerializedData } from './type';

type MySources = {
  DOM: DOMSource;
  HISTORY: HistorySource;
  HTTP: HTTPSource;
};

type MySinks = {
  DOM: xs<any>;
};

const main = (): void => {
  const serialized: SerializedData | undefined = typeof window === 'undefined'
    ? undefined : (<any>window).INITIAL_STATE;
  const initialState = deserialize(serialized);
  run(
    (sources: MySources): MySinks => view(model(intent(sources), initialState)),
    {
      DOM: makeDOMDriver('#app'),
      HISTORY: makeHistoryDriver(),
      HTTP: makeHTTPDriver(),
      TITLE: makeTitleDriver()
    }
  );
};

// FIXME
main();

export { main };
