import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command } from './util/command';

const intent = ({ DOM }: Sources): xs<Command> => {
  const click1$: xs<Event> = DOM.select('a.menu').events('click')
    .map((e) => {
      e.preventDefault();
      return e;
    });
  const click2$: xs<Event> = DOM.select('.entry-detail').events('click')
    .filter((e: Event) => !(e.target as any).matches('.entry, .entry *'));
  const click3$: xs<Event> = DOM.select('.entry-list').events('click')
    .filter((e) => !(e.target as any).matches('.is-menu *'));
  const click$ = xs.merge(click1$, click2$, click3$);
  const command$: xs<Command> = click$.map<Command>(() => ({ type: 'menu' }));
  return command$;
};

export { intent };
