import { parse } from 'url';
import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command, GoToCommand } from './util/command';

const intent = ({ HISTORY }: Sources): xs<Command> => {
  const x$: xs<{ data: any; title: string; url: string; }> = HISTORY;
  return x$.map(({ url }): GoToCommand => {
    const u = parse(url);
    const path = typeof u.pathname === 'undefined' ? '/' : u.pathname;
    return { type: 'go-to', path };
  });
};

export { intent };
