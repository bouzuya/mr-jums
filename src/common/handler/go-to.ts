import xs from 'xstream';

import { route } from '../../server/route'; // TODO
import { GoToCommand, MenuCommand, SelectCommand } from '../command';
import { Message } from '../model/message';
import { select } from './util/select';

const model = (message$: xs<Message>): xs<Message> => {
  return select<GoToCommand>(message$, 'go-to')
    .map(({ path }): SelectCommand | MenuCommand => {
      const { name, params } = route(path);
      if (name === 'entry-list') {
        return { type: 'menu' };
      } else if (name === 'entry-detail') {
        const { year, month, date } = params;
        const entryId = `${year}-${month}-${date}`;
        return { type: 'select', entryId };
      } else {
        throw new Error();
      }
    });
};

export { model };
