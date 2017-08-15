import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command } from './util/command';

const intent = ({ DOM }: Sources): xs<Command> => {
  const click$: xs<Event> = DOM.select('a.prev').events('click');
  const prev$: xs<Command> = click$.map<Command>((e) => {
    e.preventDefault();
    return { type: 'prev' };
  });
  return prev$;
};

export { intent };
