import { VNode, div } from '@cycle/dom';
import { Entry } from '../../type';
import { view as entryView } from './entry';

const view = (selectedEntry: Entry | null): VNode | null => {
  if (selectedEntry === null) return null;
  return div([
    entryView(selectedEntry)
  ]);
};

export { view };
