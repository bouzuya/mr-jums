import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { DOMSource, makeDOMDriver } from '@cycle/dom';
import { view } from './view';

const main = ({ DOM }: { DOM: DOMSource }) => {
  const click$: xs<Event> = DOM.select('input').events('click');
  const checked$: xs<boolean> = click$
    .map((event) => (event.target as any).checked)
  const state$: xs<boolean> = checked$.startWith(false);
  return view(state$);
};

const drivers = {
  DOM: makeDOMDriver('#app')
};

const run2 = () => {
  run(main, drivers);
};

export { run2 as run };
