import { VNode, div } from '@cycle/dom';
import { EntryViewer } from '../../type';
import { view as entryView } from './entry';

const view = (
  entryViewer: EntryViewer
): VNode | null => {
  if (entryViewer.selectedEntry === null) return null;
  return div([entryView(entryViewer.selectedEntry)]);
};

export { view };
