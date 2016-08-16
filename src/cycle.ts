import { run } from '@cycle/xstream-run';
import { DOMSource, makeDOMDriver } from '@cycle/dom';
import { intent } from './intent';
import { model } from './model';
import { view } from './view';

const main = (sources: { DOM: DOMSource }) => {
  return view(model(intent(sources)));
};

const drivers = {
  DOM: makeDOMDriver('#app')
};

const run2 = () => {
  run(main, drivers);
};

export { run2 as run };
