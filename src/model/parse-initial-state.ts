import { create } from '../model/entry-viewer';
import { State, StateData } from '../type';

const parseInitialState = (state: StateData | undefined): State => {
  if (typeof state === 'undefined') {
    return {
      entry: null,
      entryViewer: create([]),
      menu: true
    };
  }
  const entryViewer = create(state.entries);
  return {
    entry: state.entry,
    entryViewer: state.entry === null
      ? entryViewer : entryViewer.select(state.entry.id),
    menu: state.entry === null
  };
};

export { parseInitialState };
