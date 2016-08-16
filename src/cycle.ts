import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { DOMSource, makeDOMDriver, div, input, p } from '@cycle/dom';

const main = ({ DOM }: { DOM: DOMSource }) => {
  const click$: xs<Event> = DOM.select('input').events('click');
  const vtree$ = click$
    .map(ev => (ev.target as any).checked)
    .startWith(false)
    .map(toggled =>
      div([
        input({ attrs: { type: 'checkbox' } }), 'Toggle me',
        p(toggled ? 'ON' : 'off')
      ])
    )
  const sinks = { DOM: vtree$ };
  return sinks;
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

const run2 = () => {
  run(main, drivers);
};

export { run2 as run };
