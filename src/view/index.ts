import xs from 'xstream';
import { view as domView } from './dom';
import { State } from '../type';

const view = (state$: xs<State>): { DOM: xs<any>; } => {
  const sinks = { DOM: domView(state$) };
  return sinks;
};

export { view };
