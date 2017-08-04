import { State } from '../../type/state';
import { create, focus, select } from '../entry-viewer';

const deserialize = (serialized: string): State => {
  const data = JSON.parse(serialized);
  const entryViewer = create(data.partialEntries);
  return {
    selectedEntryDetail: data.selectedEntryDetail,
    entryViewer: data.selectedEntryDetail === null
      ? focus(entryViewer, data.focusedEntryId)
      : select(entryViewer, data.selectedEntryDetail.id),
    focus: data.selectedEntryDetail === null
      ? 'entry-list'
      : 'entry-detail'
  };
};

export { deserialize };
