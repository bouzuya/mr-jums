import { Entry } from '../../type/entry';
import { EntryViewer } from '../../type/entry-viewer';
import { focusNext } from './focus-next';
import { focusPrev } from './focus-prev';
import { getCurrentEntry as getCurrentEntryImpl } from './get-current-entry';
import { getCurrentPageEntries } from './get-current-page-entries';
import { select } from './select';
import { selectNext } from './select-next';
import { selectPrev } from './select-prev';

import { getNextEntry as getNextEntryImpl } from './get-next-entry';
import { getPrevEntry as getPrevEntryImpl } from './get-prev-entry';

const create = (entries: Entry[]): EntryViewer => {
  return {
    allEntries: null,
    entries,
    focusedEntryId: (entries.length > 0 ? entries[0].id : null),
    selectedEntryId: null
  };
};

const withAll = (entryViewer: EntryViewer, allEntries: Entry[]): EntryViewer => {
  const { entries, focusedEntryId, selectedEntryId } = entryViewer;
  return {
    allEntries,
    entries,
    focusedEntryId,
    selectedEntryId
  };
};

const getCurrentFocusedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, entries, focusedEntryId } = entryViewer;
  return getCurrentEntryImpl(
    allEntries === null ? entries : allEntries,
    focusedEntryId
  );
};

const getCurrentSelectedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, entries, selectedEntryId } = entryViewer;
  return getCurrentEntryImpl(
    allEntries === null ? entries : allEntries,
    selectedEntryId
  );
};

const getNextFocusedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, entries, focusedEntryId } = entryViewer;
  return getNextEntryImpl(
    allEntries === null ? entries : allEntries,
    focusedEntryId
  );
};

const getNextSelectedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, entries, selectedEntryId } = entryViewer;
  return getNextEntryImpl(
    allEntries === null ? entries : allEntries,
    selectedEntryId
  );
};

const getPrevFocusedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, entries, focusedEntryId } = entryViewer;
  return getPrevEntryImpl(
    allEntries === null ? entries : allEntries,
    focusedEntryId
  );
};

const getPrevSelectedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, entries, selectedEntryId } = entryViewer;
  return getPrevEntryImpl(
    allEntries === null ? entries : allEntries,
    selectedEntryId
  );
};

export {
  create,
  focusNext,
  focusPrev,
  getCurrentFocusedEntry,
  getCurrentSelectedEntry,
  getCurrentPageEntries,
  getNextFocusedEntry,
  getNextSelectedEntry,
  getPrevFocusedEntry,
  getPrevSelectedEntry,
  select,
  selectNext,
  selectPrev,
  withAll
};
