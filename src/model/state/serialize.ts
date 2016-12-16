import { State, StateData } from '../../type';

const serialize = (state: State): StateData => {
  return {
    entry: state.entry,
    entries: state.entryViewer.entries
  };
};

export { serialize };
