import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command } from './util/command';

const intent = ({ DOM }: Sources): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.enter').events('click');
  const enter$: xs<Command> = click$.map<Command>(() => ({ type: 'enter' }));
  return enter$;
};

export { intent };
