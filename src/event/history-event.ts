import { Event } from './event';

export interface HistoryEvent extends Event {
  type: 'history';
  path: string;
}

