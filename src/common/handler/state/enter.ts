import { EnterCommand } from '../../command';
import { select as entryViewerSelect } from '../../model/entry-viewer';
import { State } from '../../type/state';

const enter = (state: State, _: EnterCommand): State => {
  const { entryViewer } = state;
  return Object.assign({}, state, {
    entryViewer: entryViewerSelect(entryViewer),
    focus: 'entry-detail',
    selectedEntryDetail: null
  });
};

export { enter };
