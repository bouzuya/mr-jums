import { Entry, EntryDetail, State, SerializedData } from '../../type';
import { deserialize } from './deserialize';

const create = (
  { entry, entries }: {
    entry?: EntryDetail;
    entries: Entry[];
  }
): State => {
  const data: SerializedData = Object.assign(
    { entries },
    typeof entry === 'undefined'
      ? { entry: null } : { entry }
  );
  return deserialize(data);
};

export { create };
