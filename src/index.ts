import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { DOMSource, makeDOMDriver } from '@cycle/dom';
import { HTTPSource, makeHTTPDriver } from '@cycle/http';
import { intent } from './intent';
import { model } from './model';
import { view } from './view';

type MySources = {
  DOM: DOMSource;
  HTTP: HTTPSource;
};

type MySinks = {
  DOM: xs<any>;
};

const main = (): void => {
  const initialState: any = typeof window === 'undefined'
    ? undefined : (<any>window).INITIAL_STATE;
  run(
    (sources: MySources): MySinks => view(model(intent(sources), initialState)),
    {
      DOM: makeDOMDriver('#app'),
      HTTP: makeHTTPDriver()
    }
  );
};

// FIXME
main();

export { main };
