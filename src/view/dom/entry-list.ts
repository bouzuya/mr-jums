import { VNode, div, ul, li } from '@cycle/dom';
import { Entry } from '../../type';
import { view as entryView } from './entry';

const view = (entries: Entry[]): VNode => {
  const max = 10;
  return div([
    ul(
      '.entry-list',
      entries.filter((_, index) => index < max).map((entry) => {
        return li(
          '.entry-list-item.entry-id-' + entry.id, [
            entryView(entry)
          ]);
      }))
  ]);
};

export { view };
