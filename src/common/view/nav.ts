import { VNode, a, div } from '@cycle/dom';
import { State } from '../type/state';

import {
  getNextFocusedEntry,
  getNextSelectedEntry,
  getPrevFocusedEntry,
  getPrevSelectedEntry
} from '../model/entry-viewer';

const view = ({ entryViewer, focus }: State): VNode => {
  const cf = entryViewer.focusedEntryId;
  const nf = getNextFocusedEntry(entryViewer);
  const ns = getNextSelectedEntry(entryViewer);
  const pf = getPrevFocusedEntry(entryViewer);
  const ps = getPrevSelectedEntry(entryViewer);
  const hasNext = focus === 'entry-list' ? nf !== null : ns !== null;
  const hasPrev = focus === 'entry-list' ? pf !== null : ps !== null;
  const up = '\u25b2'; // U+25B2 BLACK UP-POINTING TRIANGLE
  const down = '\u25bc'; // U+25BC BLACK DOWN-POINTING TRIANGLE
  const right = '\u25b6'; // U+25B6 BLACK RIGHT-POINTING TRIANGLE
  const left = '\u25c0'; // U+25C0 BLACK LEFT-POINTING TRIANGLE
  const menuHref = focus === 'entry-list'
    ? '/'
    : (cf === null ? '/' : '/?f=' + cf.split('-').join('-'));
  const nextHref = focus === 'entry-list'
    ? (nf === null ? '/' : '/?f=' + nf.id.split('-').join('-'))
    : (ns === null ? '/' : '/' + ns.id.split('-').join('/') + '/');
  const prevHref = focus === 'entry-list'
    ? (pf === null ? '/' : '/?f=' + pf.id.split('-').join('-'))
    : (ps === null ? '/' : '/' + ps.id.split('-').join('/') + '/');
  const enterHref = focus === 'entry-list'
    ? (cf === null ? '/' : '/' + cf.split('-').join('/') + '/')
    : '/';
  return div('.nav', { class: { 'is-menu': focus === 'entry-list' } }, [
    a('.menu', { attrs: { href: menuHref } }, [left]),
    a('.next', {
      class: { 'is-disabled': !hasNext },
      attrs: { href: nextHref }
    }, [down]),
    a('.prev', {
      class: { 'is-disabled': !hasPrev },
      attrs: { href: prevHref }
    }, [up]),
    a('.enter', { attrs: { href: enterHref } }, [right])
  ]);
};

export { view };
