import xs from 'xstream';
import { div, input, p, VNode } from '@cycle/dom';

// view for DOM driver
const render = (state$: xs<boolean>): xs<VNode> => {
  const vnode$ = state$
    .map((toggled) =>
      div([
        input({ attrs: { type: 'checkbox' } }), 'Toggle me',
        p(toggled ? 'ON' : 'off')
      ])
    );
  return vnode$;
};

// view for all drivers (Sinks)
const view = (state$: xs<boolean>): { DOM: xs<any>; } => {
  const vnode$ = render(state$);
  const sinks = { DOM: vnode$ };
  return sinks;
};

export { view };
