import { State } from '../../type/state';

const serialize = (state: State): string => {
  const data = {
    selectedEntryDetail: state.selectedEntryDetail,
    partialEntries: state.entryViewer.partialEntries
  };
  return JSON.stringify(data);
};

export { serialize };
