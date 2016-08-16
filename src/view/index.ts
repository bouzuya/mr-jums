import xs from 'xstream';
import { div, input, p, ul, li, VNode } from '@cycle/dom';
import { Entry, State } from '../type';

// view for DOM driver

const entryView = (entry: Entry): VNode => {
  return div('.entry', [
    div('.header', [entry.title]),
    div('.body', [entry.body])
  ]);
};

const entriesView = (entries: Entry[]): VNode => {
  return div([
    ul(
      '.entry-list',
      entries.map((entry) => {
        return li(
          '.entry-list-item', [
            entryView(entry)
          ]);
      }))
  ]);
};

const appView = (state: State): VNode => {
  const { checked, entries } = state;
  return div([
    input({ attrs: { type: 'checkbox' } }), 'Toggle me',
    p(checked ? 'ON' : 'off'),
    entriesView(entries)
  ]);
};

const render = (state$: xs<State>): xs<VNode> => {
  const vnode$ = state$.map((state) => appView(state));
  return vnode$;
};

// view for all drivers (Sinks)
const view = (state$: xs<State>): { DOM: xs<any>; } => {
  const vnode$ = render(state$);
  const sinks = { DOM: vnode$ };
  return sinks;
};

export { view };
