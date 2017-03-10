import xs from 'xstream';
import { HistoryPoppedEvent, HistoryPushedEvent, StateEvent } from '../event';
import { Command, Event, Message } from '../model/message';

type P = {
  path: string;
  title: string;
};

type T = {
  stack: P[];
  event: HistoryPoppedEvent | HistoryPushedEvent | null;
};

const p$ = (message$: xs<Message>): xs<P> => {
  const bbn = 'blog.bouzuya.net';
  return message$
    .filter((m) => m.type === 'state')
    .map<StateEvent>((message) => <StateEvent>message)
    .map(({ state: { selectedEntryDetail: entry, menu } }) => {
      const path = menu === true
        ? '/' : entry === null
          ? '/' : `/${entry.id.replace(/-/g, '/')}/`;
      const title = menu === true
        ? bbn : entry === null
          ? bbn : `${entry.id} ${entry.title} - ${bbn}`;
      return { path, title };
    });
};

const ignore = ({ stack }: T): T => {
  return { stack, event: null };
};

const pop = ({ stack }: T): T => {
  // assert(stack.length >= 2);
  stack.splice(stack.length - 1, 1);
  const { path, title } = stack[stack.length - 1];
  return { stack, event: { type: 'history-popped', path, title } };
};

const push = ({ stack }: T, { path, title }: P): T => {
  stack.push({ path, title });
  return { stack, event: { type: 'history-pushed', path, title } };
};

const handleP = (t: T, p: P): T => {
  const { path } = p;
  if (t.stack.length === 0) {
    return push(t, p);
  } else if (t.stack.length === 1) {
    const last1 = t.stack[t.stack.length - 1];
    if (last1.path === path) {
      return ignore(t);
    } else {
      return push(t, p);
    }
  } else {
    const last2 = t.stack[t.stack.length - 2];
    const last1 = t.stack[t.stack.length - 1];
    if (last2.path === path) {
      return pop(t);
    } else if (last1.path === path) {
      return ignore(t);
    } else {
      return push(t, p);
    }
  }
};

const model = (
  message$: xs<Message>
): xs<HistoryPoppedEvent | HistoryPushedEvent> => {
  return p$(message$)
    .fold<T>((a, x) => handleP(a, x), { stack: [], event: null })
    .map<HistoryPoppedEvent | HistoryPushedEvent | null>(({ event }) => event)
    .filter((event): event is (HistoryPoppedEvent | HistoryPushedEvent) => {
      return event !== null;
    });
};

export { model, Command, Event };
