import {
  History as FakeHistory,
  back, create, current, currentState, previous, pushState
} from 'fake-history-fns';
import xs from 'xstream';
import { HistoryPoppedEvent, HistoryPushedEvent, StateEvent } from '../event';
import { Command, Event, Message } from '../model/message';
import {
  getCurrentFocusedEntry,
  getCurrentSelectedEntry,
  getPrevFocusedEntry
} from '../model/entry-viewer';

type P = {
  path: string;
  title: string;
};

type T = {
  event: HistoryPoppedEvent | HistoryPushedEvent | null;
  history: FakeHistory;
};

const p$ = (message$: xs<Message>): xs<P> => {
  const bbn = 'blog.bouzuya.net';
  return message$
    .filter<StateEvent>((m): m is StateEvent => m.type === 'state')
    .filter(({ state: { lastCommand } }) =>
      typeof lastCommand === 'undefined' ||
      lastCommand.type === 'enter' ||
      lastCommand.type === 'menu' ||
      lastCommand.type === 'next' ||
      lastCommand.type === 'prev' ||
      lastCommand.type === 'select'
    )
    .map(({ state: { entryViewer, focus } }: StateEvent) => {
      const focused = getCurrentFocusedEntry(entryViewer);
      const selected = getCurrentSelectedEntry(entryViewer);
      const path = focus === 'entry-list'
        ? focused === null || getPrevFocusedEntry(entryViewer) === null
          ? '/'
          : `/${focused.id.replace(/-/g, '/')}/related/`
        : selected === null
          ? '/'
          : `/${selected.id.replace(/-/g, '/')}/`;
      const title = focus === 'entry-list'
        ? bbn
        : selected === null
          ? bbn
          : `${selected.id} ${selected.title} - ${bbn}`;
      return { path, title };
    });
};

const handleP = (t: T, p: P): T => {
  const { path: eventPath } = p;
  const { history } = t;
  if (previous(history) === eventPath) {
    const newHistory = back(history);
    const pathOrNull = current(newHistory);
    const { title }: { title: string; } = currentState(newHistory);
    const path = pathOrNull === null ? '/' : pathOrNull;
    return {
      event: { type: 'history-popped', path, title },
      history: newHistory
    };
  } else if (current(history) === eventPath) {
    return { event: null, history };
  } else {
    const { path, title } = p;
    const newHistory = pushState(history, { title }, title, path);
    return {
      event: { type: 'history-pushed', path, title },
      history: newHistory
    };
  }
};

const model = (
  message$: xs<Message>
): xs<HistoryPoppedEvent | HistoryPushedEvent> => {
  return p$(message$)
    .fold<T>((a, x) => handleP(a, x), { history: create(), event: null })
    .map<HistoryPoppedEvent | HistoryPushedEvent | null>(({ event }) => event)
    .filter((event): event is (HistoryPoppedEvent | HistoryPushedEvent) => {
      return event !== null;
    });
};

export { model, Command, Event };
