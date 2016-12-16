import xs from 'xstream';
import { model as history$ } from './history';
import { model as request$ } from './request';
import { model as state$ } from './state';
import { Command, Event, Message } from './message';
import { deserialize } from './state/deserialize';
import { State, StateData } from '../type';

const isEvent = (message: Message): message is Event => {
  return message.type === 'state' ||
    message.type === 'request' ||
    message.type == 'history';
};

const model = (
  command$: xs<Command>,
  initialState: StateData | undefined
): xs<Event> => {
  const state: State = deserialize(initialState);
  const subject = xs.create<Message>();
  const message$ = xs.merge<Message>(
    command$,
    history$(subject),
    request$(subject),
    state$(subject, state)
  )
    .map((message) => {
      setTimeout(() => subject.shamefullySendNext(message));
      return message;
    });
  const event$ = message$
    .filter(isEvent)
    .map((event) => event as Event);
  return event$;
};

export { model };
