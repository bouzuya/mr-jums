import { VNode, a, div } from '@cycle/dom';
import { Entry } from '../type/entry';
import { State } from '../type/state';

import {
  getCurrentFocusedEntry,
  getNextFocusedEntry,
  getNextSelectedEntry,
  getPrevFocusedEntry,
  getPrevSelectedEntry
} from '../model/entry-viewer';

const toPath = (entry: Entry | null, type: 'focus' | 'select'): string => {
  const path = entry === null ? '/' : '/' + entry.id.split('-').join('/') + '/';
  switch (type) {
    case 'focus':
      return path + 'related/';
    case 'select':
      return path;
    default:
      throw new Error();
  }
};

const view = ({ entryViewer, focus }: State): VNode => {
  const isMenu = focus === 'entry-list';
  const cf = getCurrentFocusedEntry(entryViewer);
  const nf = getNextFocusedEntry(entryViewer);
  const ns = getNextSelectedEntry(entryViewer);
  const pf = getPrevFocusedEntry(entryViewer);
  const ps = getPrevSelectedEntry(entryViewer);
  const hasNext = isMenu ? nf !== null : ns !== null;
  const hasPrev = isMenu ? pf !== null : ps !== null;
  const up = '\u25b2'; // U+25B2 BLACK UP-POINTING TRIANGLE
  const down = '\u25bc'; // U+25BC BLACK DOWN-POINTING TRIANGLE
  const right = '\u25b6'; // U+25B6 BLACK RIGHT-POINTING TRIANGLE
  const left = '\u25c0'; // U+25C0 BLACK LEFT-POINTING TRIANGLE
  const menuHref = isMenu ? '/' : toPath(cf, 'focus');
  const nextHref = isMenu ? toPath(nf, 'focus') : toPath(ns, 'select');
  const prevHref = isMenu ? toPath(pf, 'focus') : toPath(ps, 'select');
  const enterHref = isMenu ? toPath(cf, 'select') : '/';
  return div('.nav', { class: { 'is-menu': isMenu } }, [
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
