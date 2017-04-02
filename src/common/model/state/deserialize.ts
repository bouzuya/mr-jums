import { State } from '../../type/state';
import { create, select } from '../entry-viewer';

const deserialize = (serialized: string): State => {
  const data = JSON.parse(serialized);
  const entryViewer = create(data.entries);
  return {
    selectedEntryDetail: data.selectedEntryDetail,
    entryViewer: data.selectedEntryDetail === null
      ? entryViewer : select(entryViewer, data.selectedEntryDetail.id),
    focus: data.selectedEntryDetail === null
      ? 'entry-list'
      : 'entry-detail'
  };
};

export { deserialize };
