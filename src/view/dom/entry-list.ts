import { VNode, div, ul, li } from '@cycle/dom';
import { Entry } from '../../type';
import { view as entryView } from './entry';

const view = (entries: Entry[]): VNode => {
  return div([
    ul(
      '.entry-list',
      entries.map((entry) => {
        return li(
          '.entry-list-item', [
            entryView(entry)
          ]);
      }))
  ]);
};

export { view };
