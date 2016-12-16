import xs from 'xstream';
import { StateEvent } from '../../event';
import { Command, Event, Message } from '../message';
import { HistoryEvent } from '../../event';

const path$ = (
  message$: xs<Message>
): xs<{ path: string; title: string; }> => {
  const bbn = 'blog.bouzuya.net';
  return message$
    .filter((m) => m.type === 'state')
    .map<StateEvent>((message) => <StateEvent>message)
    .map(({ state: { entry, menu } }) => {
      const path = menu === true
        ? '/' : entry === null
          ? '/' : `/${entry.id.replace(/-/g, '/')}/`;
      const title = menu === true
        ? bbn : entry === null
          ? bbn : `${entry.id} ${entry.title} - ${bbn}`;
      return { path, title };
    });
};

const model = (
  message$: xs<Message>
): xs<HistoryEvent> => {
  const push$ = path$(message$)
    .map<HistoryEvent>(({ path, title }) => {
      return { type: 'history', path, title };
    });
  return push$;
};

export { model, Command, Event };
