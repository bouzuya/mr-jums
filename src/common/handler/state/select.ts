import { SelectCommand } from '../../command';
import { select as entryViewerSelect } from '../../model/entry-viewer';
import { State } from '../../type/state';

const select = (state: State, command: SelectCommand): State => {
  const { entryViewer } = state;
  return Object.assign({}, state, {
    entryViewer: entryViewerSelect(entryViewer, command.entryId),
    menu: false,
    selectedEntryDetail: null
  });
};

export { select };
