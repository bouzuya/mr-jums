import { Entry, EntryDetail, State, StateData } from '../../type';
import { deserialize } from './deserialize';

const create = (
  { entry, entries }: {
    entry?: EntryDetail;
    entries: Entry[];
  }
): State => {
  const data: StateData = Object.assign(
    { entries },
    typeof entry === 'undefined'
      ? { entry: null } : { entry }
  );
  return deserialize(data);
};

export { create };
