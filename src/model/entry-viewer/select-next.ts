import { EntryViewer } from '../../type';
import { EntryViewerImpl } from './entry-viewer-impl';

const selectNext: (entryViewer: EntryViewer) => EntryViewer =
  (entryViewerImpl: EntryViewerImpl): EntryViewer => {
    return entryViewerImpl.selectNext();
  };

export { selectNext };
