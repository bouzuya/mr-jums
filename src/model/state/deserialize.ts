import { State, SerializedData } from '../../type';
import { create, select } from '../entry-viewer';

const deserialize = (data: SerializedData | undefined): State => {
  if (typeof data === 'undefined') {
    return {
      entry: null,
      entryViewer: create([]),
      menu: true
    };
  }
  const entryViewer = create(data.entries);
  return {
    entry: data.entry,
    entryViewer: data.entry === null
      ? entryViewer : select(entryViewer, data.entry.id),
    menu: data.entry === null
  };
};

export { deserialize };
