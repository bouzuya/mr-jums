import xs from 'xstream';
import { Event, Message } from './message';

const isEvent = (message: Message): message is Event => {
  return message.type === 'state' ||
    message.type === 'request' ||
    message.type == 'history-popped' ||
    message.type == 'history-pushed';
};

const model = (
  handlers: ((subject$: xs<Message>) => xs<Message>)[]
): xs<Event> => {
  const subject = xs.create<Message>();
  const merged$: xs<Message> = xs.merge.apply(
    xs,
    handlers.map((handler) => handler(subject))
  );
  const message$ = merged$.filter((message) => message.type !== 'noop');
  const event$ = message$
    .map((message) => {
      setTimeout(() => subject.shamefullySendNext(message));
      return message;
    })
    .filter(isEvent)
    .map((event) => event as Event);
  return event$;
};

export { model };
