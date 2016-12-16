import { State, StateData } from '../../type';
import { create, select } from '../entry-viewer';

const serialize = (state: State): StateData => {
  return {
    entry: state.entry,
    entries: state.entryViewer.entries
  };
};

export { serialize };
