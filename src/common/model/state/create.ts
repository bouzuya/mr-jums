import { Entry } from '../../type/entry';
import { EntryDetail } from '../../type/entry-detail';
import { State } from '../../type/state';
import { deserialize } from './deserialize';

const create = (
  { entry, entries, focus }: {
    entry?: EntryDetail;
    entries: Entry[];
    focus: string | null;
  }
): State => {
  const data = Object.assign(
    { partialEntries: entries },
    typeof entry === 'undefined'
      ? { selectedEntryDetail: null, focusedEntryId: focus }
      : { selectedEntryDetail: entry, focusedEntryId: focus }
  );
  const serialized = JSON.stringify(data);
  return deserialize(serialized);
};

export { create };
