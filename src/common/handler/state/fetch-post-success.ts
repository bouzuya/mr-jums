import { FetchPostSuccessCommand } from '../../command';
import { State } from '../../type/state';

const fetchPostSuccess = (
  state: State, command: FetchPostSuccessCommand
): State => {
  const { data, date, html, minutes, pubdate, tags, title } = command.post;
  const selectedEntryDetail = { description: data.substring(0, 100), id: date, html, minutes, pubdate, tags, title };
  return Object.assign({}, state, { selectedEntryDetail });
};

export { fetchPostSuccess };
