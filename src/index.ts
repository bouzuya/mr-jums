import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { DOMSource, makeDOMDriver } from '@cycle/dom';
import { intent } from './intent';
import { model } from './model';
import { view } from './view';

type MySources = {
  DOM: DOMSource
};

type MySinks = {
  DOM: xs<any>;
};

const main = (): void => {
  run(
    (sources: MySources): MySinks => view(model(intent(sources))),
    {
      DOM: makeDOMDriver('#app')
    }
  );
};

export { main };
