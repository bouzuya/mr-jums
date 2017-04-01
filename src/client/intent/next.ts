import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command } from './util/command';

const intent = ({ DOM }: Sources): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.next').events('click');
  const next$: xs<Command> = click$.map<Command>(() => ({ type: 'next' }));
  return next$;
};

export { intent };
