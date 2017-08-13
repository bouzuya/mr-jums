import {
  VNode, VNodeData, a, article, div, footer, header, h, h1, section, span
} from '@cycle/dom';
import { Entry } from '../type/entry';
import { EntryDetail } from '../type/entry-detail';

const isDetail = (entry: Entry | EntryDetail): entry is EntryDetail => {
  return typeof (<EntryDetail>entry).html !== 'undefined';
};

const entryView = (entry: Entry): VNode => {
  return div('.entry', [
    div('.header', [
      span('.id', [entry.id]),
      span('.title', [entry.title]),
    ])
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

const view = (entry: Entry | EntryDetail): VNode => {
  return isDetail(entry) ? entryDetailView(entry) : entryView(entry);
};

export { view };
