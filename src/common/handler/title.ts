import xs from 'xstream';
import { Message } from '../model/message';
import { NoopCommand } from '../../common/command';
import {
  Event,
  EventType,
  HistoryPushedEvent
} from '../../common/event';

const select = <T extends Event>(
  event$: xs<Message>, type: EventType
): xs<T> => {
  return event$.filter((event) => event.type === type) as xs<T>;
};

const model = (message$: xs<Message>): xs<Message> => {
  const noop: NoopCommand = { type: 'noop' };
  return select<HistoryPushedEvent>(message$, 'history-pushed')
    .map(({ title }) => {
      if (typeof window === 'undefined') return noop;
      if (typeof window.document === 'undefined') return noop;
      window.document.title = title;
      return noop;
    });
};

export { model };
