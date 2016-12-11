import { EntryViewer } from '../../type';
import { EntryViewerImpl } from './entry-viewer-impl';

const focus: (entryViewer: EntryViewer, entryId: string) => EntryViewer =
  (entryViewerImpl: EntryViewerImpl, entryId: string): EntryViewer => {
    return entryViewerImpl.focus(entryId);
  };

export { focus };
