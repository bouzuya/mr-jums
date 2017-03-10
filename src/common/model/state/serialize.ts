import { State } from '../../type/state';

const serialize = (state: State): string => {
  const data = {
    selectedEntryDetail: state.selectedEntryDetail,
    entries: state.entryViewer.entries
  };
  return JSON.stringify(data);
};

export { serialize };
