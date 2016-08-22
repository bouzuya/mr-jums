import { VNode, div } from '@cycle/dom';
import { EntryDetail } from '../../type';
import { view as entryView } from './entry';

const view = (
  entry: EntryDetail | null
): VNode | null => {
  if (entry === null) return null;
  return div('.entry-detail', [entryView(entry)]);
};

export { view };
