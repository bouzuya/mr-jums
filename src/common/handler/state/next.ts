import { NextCommand } from '../../command';
import { focusNext, selectNext } from '../../model/entry-viewer';
import { State } from '../../type/state';

const next = (state: State, _: NextCommand): State => {
  const { entryViewer, focus } = state;
  return Object.assign({}, state, {
    entryViewer: focus === 'entry-list'
      ? focusNext(entryViewer)
      : selectNext(entryViewer),
    selectedEntryDetail: null
  });
};

export { next };
