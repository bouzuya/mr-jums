import { EntryViewer } from '../../type';
import { EntryViewerImpl } from './entry-viewer-impl';

const selectPrev: (entryViewer: EntryViewer) => EntryViewer =
  (entryViewerImpl: EntryViewerImpl): EntryViewer => {
    return entryViewerImpl.selectPrev();
  };

export { selectPrev };
