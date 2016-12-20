import xs from 'xstream';
import { HistoryEvent } from '../../event';

const view = (title$: xs<HistoryEvent>): xs<string> => {
  return title$.map<string>((event) => event.title);
};

export { view };
