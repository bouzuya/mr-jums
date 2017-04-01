import xs from 'xstream';

export interface Sinks {
  DOM: xs<any>;
  HISTORY: xs<any>;
  HTTP: xs<any>;
}
