import { Event } from './event';
import { State } from '../type/state';

export interface StateEvent extends Event {
  type: 'state';
  state: State;
}
