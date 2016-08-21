import xs from 'xstream';
import { Command } from '../command';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.menu').events('click');
  const command$: xs<Command> = click$.map<Command>(() => ({ type: 'menu' }));
  return command$;
};

export { intent };
