import xs from 'xstream';
import { model as history$ } from './handler/history';
import { model as request$ } from './handler/request';
import { model as state$ } from './handler/state';
import { Command, Event, Message } from './message';
import { State } from '../common/type';

const isEvent = (message: Message): message is Event => {
  return message.type === 'state' ||
    message.type === 'request' ||
    message.type == 'history';
};

const model = (
  command$: xs<Command>,
  initialState: State
): xs<Event> => {
  const subject = xs.create<Message>();
  const message$ = xs.merge<Message>(
    command$,
    history$(subject),
    request$(subject),
    state$(subject, initialState)
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
