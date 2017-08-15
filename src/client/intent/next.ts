import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command } from './util/command';

const intent = ({ DOM }: Sources): xs<Command> => {
  const click$: xs<Event> = DOM.select('a.next').events('click');
  const next$: xs<Command> = click$.map<Command>((e) => {
    e.preventDefault();
    return { type: 'next' };
  });
  return next$;
};

export { intent };
