import { Event } from './event';
import { State } from '../common/type';

export interface StateEvent extends Event {
  type: 'state';
  state: State;
}
