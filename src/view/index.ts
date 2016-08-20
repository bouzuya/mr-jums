import xs from 'xstream';
import { view as domView } from './dom';
import { State } from '../type';

const view = (
  event$s: { state$: xs<State>; request$: xs<any>; }
): { DOM: xs<any>; HTTP: xs<any>; } => {
  const { state$, request$ } = event$s;
  const sinks = { DOM: domView(state$), HTTP: request$ };
  return sinks;
};

export { view };
