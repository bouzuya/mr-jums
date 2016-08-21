import { Event } from './event';
import { State } from '../type';

export interface StateEvent extends Event {
  type: 'state';
  state: State;
}
