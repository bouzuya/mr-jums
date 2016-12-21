import { DOMSource } from '@cycle/dom';
import xs from 'xstream';
import { Command } from './util/command';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.next').events('click');
  const next$: xs<Command> = click$.map<Command>(() => ({ type: 'next' }));
  return next$;
};

export { intent };
