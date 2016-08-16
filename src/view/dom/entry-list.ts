import { VNode, div, ul, li } from '@cycle/dom';
import { Entry } from '../../type';
import { view as entryView } from './entry';

const view = (entries: Entry[]): VNode => {
  const count = 10;
  const offset = '2016-01-21';
  return div([
    ul(
      '.entry-list',
      entries
        .filter(({ id }) => id <= offset) // entries order by desc
        .filter((_, index) => index < count)
        .map((entry) => {
          return li(
            '.entry-list-item.entry-id-' + entry.id, [
              entryView(entry)
            ]);
        }))
  ]);
};

export { view };
