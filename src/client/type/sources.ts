import { DOMSource } from '@cycle/dom';
import { HTTPSource } from '@cycle/http';
import { HistorySource } from '@bouzuya/cyclejs-history-driver';

export interface Sources {
  DOM: DOMSource;
  HISTORY: HistorySource;
  HTTP: HTTPSource;
}
