import { FetchPostsSuccessCommand } from '../../command';
import { create } from '../../model/entry-viewer';
import { State } from '../../type/state';

const fetchPostsSuccess = (
  state: State, command: FetchPostsSuccessCommand
): State => {
  const posts = command.posts
    .map(({ date, title }) => ({ id: date, title }))
    .sort(({ id: a }, { id: b }) => a > b ? -1 : (a === b ? 0 : 1));
  return Object.assign({}, state, {
    entryViewer: create(posts)
  });
};

export { fetchPostsSuccess };
