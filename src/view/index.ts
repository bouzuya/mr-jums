import xs from 'xstream';
import { view as domView } from './dom';
import { view as historyView } from './history';
import { view as httpView } from './http';
import { view as titleView } from './title';
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
    HTTP: httpView(select<RequestEvent>(event$, 'request')),
    TITLE: titleView(select<HistoryEvent>(event$, 'history'))
  };
  return sinks;
};

export { view };
