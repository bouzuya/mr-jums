import { VNode, div } from '@cycle/dom';
import { State } from '../type/state';

import {
  getNextFocusedEntry,
  getNextSelectedEntry,
  getPrevFocusedEntry,
  getPrevSelectedEntry
} from '../model/entry-viewer';

const view = ({ entryViewer, focus }: State): VNode => {
  const hasNext = focus === 'entry-list'
    ? getNextFocusedEntry(entryViewer) !== null
    : getNextSelectedEntry(entryViewer) !== null;
  const hasPrev = focus === 'entry-list'
    ? getPrevFocusedEntry(entryViewer) !== null
    : getPrevSelectedEntry(entryViewer) !== null;
  const up = '\u25b2'; // U+25B2 BLACK UP-POINTING TRIANGLE
  const down = '\u25bc'; // U+25BC BLACK DOWN-POINTING TRIANGLE
  const right = '\u25b6'; // U+25B6 BLACK RIGHT-POINTING TRIANGLE
  const left = '\u25c0'; // U+25C0 BLACK LEFT-POINTING TRIANGLE
  return div('.nav', { class: { 'is-menu': focus === 'entry-list' } }, [
    div('.menu', [left]),
    div('.next', { class: { 'is-disabled': !hasNext } }, [down]),
    div('.prev', { class: { 'is-disabled': !hasPrev } }, [up]),
    div('.enter', [right])
  ]);
};

export { view };
