import xs from 'xstream';
import { view as domView } from './dom';
import { view as historyView } from './history';
import { view as httpView } from './http';
import {
  Event,
  EventType,
  HistoryEvent,
  RequestEvent,
  StateEvent
} from '../event';

const select = <T extends Event>(
  event$: xs<Event>, type: EventType
): xs<T> => {
  return event$.filter((event) => event.type === type) as xs<T>;
};

const view = (event$: xs<Event>): { DOM: xs<any>; HTTP: xs<any>; } => {
  const sinks = {
    DOM: domView(select<StateEvent>(event$, 'state')),
    HISTORY: historyView(select<HistoryEvent>(event$, 'history')),
    HTTP: httpView(select<RequestEvent>(event$, 'request'))
  };
  return sinks;
};

export { view };
