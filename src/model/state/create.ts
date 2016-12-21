import { Entry } from '../../common/type/entry';
import { EntryDetail } from '../../common/type/entry-detail';
import { State } from '../../common/type/state';
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
