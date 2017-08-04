import { State } from '../../type/state';

const serialize = (state: State): string => {
  const data = {
    focusedEntryId: state.entryViewer.focusedEntryId,
    selectedEntryDetail: state.selectedEntryDetail,
    partialEntries: state.entryViewer.partialEntries
  };
  return JSON.stringify(data);
};

export { serialize };
