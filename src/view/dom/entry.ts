import { VNode, div, span } from '@cycle/dom';
import { Entry, EntryDetail } from '../../type';

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
  return div('.entry', [
    div('.header', [
      span('.id', [entryDetail.id]),
      span('.title', [entryDetail.title]),
      span('.miuntes', [entryDetail.minutes]),
      span('.pubdate', [entryDetail.pubdate]),
      span('.tags', entryDetail.tags.map((tag) => span([tag])))
    ]),
    div('.body', [
      span('.html', { props: { innerHTML: entryDetail.html } })
    ])
  ]);
};

const view = (entry: Entry | EntryDetail): VNode => {
  return isDetail(entry) ? entryDetailView(entry) : entryView(entry);
};

export { view };
