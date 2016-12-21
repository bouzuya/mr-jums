import xs from 'xstream';
import { VNode } from '@cycle/dom';
import { StateEvent } from '../../event';
import { view as appView } from '../../common/view/app';

const view = (state$: xs<StateEvent>): xs<VNode> => {
  const vnode$ = state$.map(({ state }) => appView(state));
  return vnode$;
};

export { view };
