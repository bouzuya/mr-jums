import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command } from './util/command';

const intent = ({ DOM }: Sources): xs<Command> => {
  const click1$: xs<Event> = DOM.select('div.menu').events('click');
  const click2$: xs<Event> = DOM.select('.entry-detail')
    .events('click')
    .filter((e: Event) => !(<any>e.target).matches('.entry, .entry *'));
  const click$ = xs.merge(click1$, click2$);
  const command$: xs<Command> = click$.map<Command>(() => ({ type: 'menu' }));
  return command$;
};

export { intent };
