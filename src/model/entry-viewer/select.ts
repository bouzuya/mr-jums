import { EntryViewer } from '../../type';
import { EntryViewerImpl } from './entry-viewer-impl';

const select: (entryViewer: EntryViewer, entryId?: string) => EntryViewer =
  (entryViewerImpl: EntryViewerImpl, entryId?: string): EntryViewer => {
    return entryViewerImpl.select(entryId);
  };

export { select };
