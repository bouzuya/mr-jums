import { EntryViewer, State, StateData } from '../type';

const parseInitialState = (state: StateData | undefined): State => {
  if (typeof state === 'undefined') {
    return {
      entry: null,
      entryViewer: EntryViewer.create([]),
      menu: true
    };
  }
  return {
    entry: state.entry,
    entryViewer: EntryViewer.create(state.entries),
    menu: state.entry === null
  };
};

export { parseInitialState };
