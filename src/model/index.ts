import xs from 'xstream';
import { model as request$ } from './request';
import { model as state$ } from './state';
import { Command, Event, Message } from './message';

const model = (command$: xs<Command>): xs<Event> => {
  const subject = xs.create<Message>();
  const message$ = xs.merge<Message>(
    command$,
    request$(subject),
    state$(subject)
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
