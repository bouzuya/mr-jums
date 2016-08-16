import xs from 'xstream';
import { VNode } from '@cycle/dom';
import { State } from '../../type';
import { view as appView } from './app';

const view = (state$: xs<State>): xs<VNode> => {
  const vnode$ = state$.map((state) => appView(state));
  return vnode$;
};

export { view };
