import { VNode, div, ul, li } from '@cycle/dom';
import { Entry } from '../../type';
import { view as entryView } from './entry';
import { view as entryListView } from './partial/entry-list';

const view = (entries: Entry[]): VNode => {
  return div([
    ul(
      '.entry-list',
      entryListView(
        entries,
        '2016-01-21',
        10,
        (entry) => {
          const className = '.entry-list-item.entry-id-' + entry.id;
          return li(className, [entryView(entry)]);
        }
      )
    )
  ]);
};

export { view };
