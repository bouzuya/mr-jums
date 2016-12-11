import { EntryViewer } from '../../type';
import { EntryViewerImpl } from './entry-viewer-impl';

const focusNext: (entryViewer: EntryViewer) => EntryViewer =
  (entryViewerImpl: EntryViewerImpl): EntryViewer => {
    return entryViewerImpl.focusNext();
  };

export { focusNext };
