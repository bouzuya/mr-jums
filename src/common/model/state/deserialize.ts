import { State } from '../../type/state';
import { create, select } from '../entry-viewer';

const deserialize = (serialized: string): State => {
  const data = JSON.parse(serialized);
  const entryViewer = create(data.entries);
  return {
    selectedEntryDetail: data.entry,
    entryViewer: data.entry === null
      ? entryViewer : select(entryViewer, data.entry.id),
    menu: data.entry === null
  };
};

export { deserialize };
