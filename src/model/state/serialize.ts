import { State, SerializedData } from '../../type';

const serialize = (state: State): SerializedData => {
  return {
    entry: state.entry,
    entries: state.entryViewer.entries
  };
};

export { serialize };
