import { State } from '../../common/type';

const serialize = (state: State): string => {
  const data = {
    entry: state.entry,
    entries: state.entryViewer.entries
  };
  return JSON.stringify(data);
};

export { serialize };
