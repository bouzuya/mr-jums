import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { DOMSource, makeDOMDriver } from '@cycle/dom';
import { Action } from './action';
import { model } from './model';
import { view } from './view';

const main = ({ DOM }: { DOM: DOMSource }) => {
  const click$: xs<Event> = DOM.select('input').events('click');
  const action$: xs<Action> = click$
    .map((event) => (event.target as any).checked)
    .map<Action>((checked) => ({ type: 'toggle', checked }));
  return view(model(action$));
};

const drivers = {
  DOM: makeDOMDriver('#app')
};

const run2 = () => {
  run(main, drivers);
};

export { run2 as run };
