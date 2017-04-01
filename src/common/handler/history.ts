import {
  History as FakeHistory,
  back, create, current, currentState, previous, pushState
} from 'fake-history-fns';
import xs from 'xstream';
import { HistoryPoppedEvent, HistoryPushedEvent, StateEvent } from '../event';
import { Command, Event, Message } from '../model/message';
import { getCurrentSelectedEntry } from '../model/entry-viewer';

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
    .filter((m): m is StateEvent => m.type === 'state')
    .map(({ state: { entryViewer, menu } }) => {
      const entry = getCurrentSelectedEntry(entryViewer);
      const path = menu === true
        ? '/' : entry === null
          ? '/' : `/${entry.id.replace(/-/g, '/')}/`;
      const title = menu === true
        ? bbn : entry === null
          ? bbn : `${entry.id} ${entry.title} - ${bbn}`;
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
