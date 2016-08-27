import xs from 'xstream';
import { model as request$ } from './request';
import { model as state$ } from './state';
import { Command, Event, Message } from './message';

import { EntryViewer, State, StateData } from '../type';

const parseInitialState = (state: StateData | undefined): State => {
  if (typeof state === 'undefined') {
    return {
      entry: null,
      entryViewer: EntryViewer.create([]),
      menu: true
    };
  }
  return {
    entry: state.entry,
    entryViewer: EntryViewer.create(state.entries),
    menu: state.entry === null
  };
};

const model = (
  command$: xs<Command>,
  initialState: StateData | undefined
): xs<Event> => {
  const state: State = parseInitialState(initialState);
  const subject = xs.create<Message>();
  const message$ = xs.merge<Message>(
    command$,
    request$(subject),
    state$(subject, state)
  )
    .map((message) => {
      subject.shamefullySendNext(message);
      return message;
    });
  const event$ = message$
    .filter((m) => m.type === 'state' || m.type === 'request')
    .map((event) => event as Event);
  return event$;
};

export { model };
