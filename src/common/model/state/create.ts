import { Entry } from '../../type/entry';
import { EntryDetail } from '../../type/entry-detail';
import { State } from '../../type/state';
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
