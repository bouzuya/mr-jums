import { VNode, div } from '@cycle/dom';
import { EntryDetail } from '../type/entry-detail';
import { Entry } from '../type/entry';
import { view as entryView } from './entry';

const view = (
  entry: Entry | null,
  entryDetail: EntryDetail | null
): VNode | null => {
  return div('.entry-detail', {
    hook: {
      postpatch: (_: any, { elm }: VNode): void => {
        if (typeof elm === 'undefined') return;
        if (typeof (<any>elm).scrollTop === 'undefined') return;
        (<any>elm).scrollTop = 0;
      }
    }
  }, entry === null
      ? []
      : entryDetail === null
        ? [entryView(entry)]
        : [entryView(entryDetail)]);
};

export { view };
