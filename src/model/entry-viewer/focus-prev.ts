import { EntryViewer } from '../../type';
import { EntryViewerImpl } from './entry-viewer-impl';

const focusPrev: (entryViewer: EntryViewer) => EntryViewer =
  (entryViewerImpl: EntryViewerImpl): EntryViewer => {
    return entryViewerImpl.focusPrev();
  };

export { focusPrev };
