import { Event } from './event';

export interface HistoryPushedEvent extends Event {
  type: 'history-pushed';
  path: string;
  title: string;
}

