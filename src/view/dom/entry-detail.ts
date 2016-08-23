import { VNode, div } from '@cycle/dom';
import { EntryDetail } from '../../type';
import { view as entryView } from './entry';

const view = (
  entry: EntryDetail | null
): VNode | null => {
  return div('.entry-detail', [entry === null ? null : entryView(entry)]);
};

export { view };
