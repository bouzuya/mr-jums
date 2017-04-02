import { PrevCommand } from '../../command';
import { focusPrev, selectPrev } from '../../model/entry-viewer';
import { State } from '../../type/state';

const prev = (state: State, _: PrevCommand): State => {
  const { entryViewer, focus } = state;
  return Object.assign({}, state, {
    entryViewer: focus === 'entry-list'
      ? focusPrev(entryViewer)
      : selectPrev(entryViewer),
    selectedEntryDetail: null
  });
};

export { prev };
