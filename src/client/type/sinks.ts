import { HistoryCommand } from '@bouzuya/cyclejs-history-driver'
import { VNode } from '@cycle/dom';
import { RequestOptions } from '@cycle/http';
import xs from 'xstream';

export interface Sinks {
  DOM: xs<VNode>;
  HISTORY: xs<HistoryCommand>;
  HTTP: xs<RequestOptions>;
}
