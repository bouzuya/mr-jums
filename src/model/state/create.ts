import { Entry, EntryDetail, State } from '../../common/type';
import { deserialize } from './deserialize';

const create = (
  { entry, entries }: {
    entry?: EntryDetail;
    entries: Entry[];
  }
): State => {
  const data = Object.assign(
    { entries },
    typeof entry === 'undefined'
      ? { entry: null } : { entry }
  );
  const serialized = JSON.stringify(data);
  return deserialize(serialized);
};

export { create };
