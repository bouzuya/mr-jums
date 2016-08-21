import { Event } from './event';

export interface RequestEvent extends Event {
  type: 'request';
  request: any; // TODO
}
