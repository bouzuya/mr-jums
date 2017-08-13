import {
  VNode, VNodeData, a, article, div, footer, header, h, h1, section, span
} from '@cycle/dom';
import { Entry } from '../type/entry';
import { EntryDetail } from '../type/entry-detail';

const entryView = (entry: Entry): VNode => {
  const permalink = '/' + entry.id.split('-').join('/') + '/';
  return article('.entry', [
    header('.header', [
      h1('.id-title', [
        a({ props: { href: permalink } }, [
          span('.id', [entry.id]),
          span('.separator', [' ']),
          span('.title', [entry.title])
        ])
      ])
    ]),
    div('.body', [
      section('.content', [])
    ]),
    footer('.footer', [])
  ]);
};

const entryDetailView = (entryDetail: EntryDetail): VNode => {
  const permalink = '/' + entryDetail.id.split('-').join('/') + '/';
  return article('.entry', [
    header('.header', [
      h1('.id-title', [
        a({ props: { href: permalink } }, [
          span('.id', [entryDetail.id]),
          span('.separator', [' ']),
          span('.title', [entryDetail.title])
        ])
      ])
    ]),
    div('.body', [
      section('.content', { props: { innerHTML: entryDetail.html } })
    ]),
    footer('.footer', [
      a('.permalink', { props: { href: permalink } }, [
        time('.pubdate', { props: { datetime: entryDetail.pubdate } }, [
          entryDetail.pubdate
        ])
      ])
    ])
  ]);
};

const time = (sel: string, data: VNodeData, children: string[]) => {
  return h('time' + sel, data, children.join(''));
};

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
        : [entryDetailView(entryDetail)]);
};

export { view };
