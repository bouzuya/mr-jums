import xs from 'xstream';
import { StateEvent } from '../event';
import { Command, Event, Message } from './message';
import { HistoryEvent } from '../event';

const path$ = (message$: xs<Message>): xs<string> => {
  return message$
    .filter((m) => m.type === 'state')
    .map<StateEvent>((message) => <StateEvent>message)
    .map(({ state: { entry, menu } }) => {
      return menu === true
        ? '/' : entry === null
          ? '/' : `/${entry.id.replace(/-/g, '/')}/`;
    });
};

const model = (
  message$: xs<Message>
): xs<HistoryEvent> => {
  const push$ = path$(message$)
    .map<HistoryEvent>((path) => ({ type: 'history', path }));
  return push$;
};

export { model, Command, Event };
