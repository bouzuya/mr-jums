import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command } from './util/command';

const intent = ({ DOM }: Sources): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.prev').events('click');
  const prev$: xs<Command> = click$.map<Command>(() => ({ type: 'prev' }));
  return prev$;
};

export { intent };
