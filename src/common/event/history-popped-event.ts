import { Event } from './event';

export interface HistoryPoppedEvent extends Event {
  type: 'history-popped';
  path: string;
  title: string;
}

