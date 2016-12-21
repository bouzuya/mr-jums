import { DOMSource } from '@cycle/dom';
import xs from 'xstream';
import { Command } from './util/command';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.prev').events('click');
  const prev$: xs<Command> = click$.map<Command>(() => ({ type: 'prev' }));
  return prev$;
};

export { intent };
