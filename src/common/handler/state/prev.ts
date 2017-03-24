import { PrevCommand } from '../../command';
import { focusPrev, selectPrev } from '../../model/entry-viewer';
import { State } from '../../type/state';

const prev = (state: State, _: PrevCommand): State => {
  const { menu, entryViewer } = state;
  return Object.assign({}, state, {
    entryViewer: menu === true
      ? focusPrev(entryViewer) : selectPrev(entryViewer),
    selectedEntryDetail: null
  });
};

export { prev };
