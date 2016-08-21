import xs from 'xstream';
import { Command } from '../command';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.next').events('click');
  const next$: xs<Command> = click$.map<Command>(() => ({ type: 'next' }));
  return next$;
};

export { intent };
