import { Entry } from '../../type/entry';
import { EntryViewer } from '../../type/entry-viewer';
import { focus } from './focus';
import { focusNext } from './focus-next';
import { focusPrev } from './focus-prev';
import { getCurrentEntry as getCurrentEntryImpl } from './get-current-entry';
import { getCurrentPageEntries } from './get-current-page-entries';
import { select } from './select';
import { selectNext } from './select-next';
import { selectPrev } from './select-prev';

import { getNextEntry as getNextEntryImpl } from './get-next-entry';
import { getPrevEntry as getPrevEntryImpl } from './get-prev-entry';

const create = (partialEntries: Entry[]): EntryViewer => {
  return {
    allEntries: null,
    partialEntries,
    focusedEntryId: (partialEntries.length > 0 ? partialEntries[0].id : null),
    selectedEntryId: null
  };
};

const withAll = (entryViewer: EntryViewer, allEntries: Entry[]): EntryViewer => {
  const { partialEntries, focusedEntryId, selectedEntryId } = entryViewer;
  return {
    allEntries,
    partialEntries,
    focusedEntryId,
    selectedEntryId
  };
};

const getCurrentFocusedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, partialEntries, focusedEntryId } = entryViewer;
  return getCurrentEntryImpl(
    allEntries === null ? partialEntries : allEntries,
    focusedEntryId
  );
};

const getCurrentSelectedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, partialEntries, selectedEntryId } = entryViewer;
  return getCurrentEntryImpl(
    allEntries === null ? partialEntries : allEntries,
    selectedEntryId
  );
};

const getNextFocusedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, partialEntries, focusedEntryId } = entryViewer;
  return getNextEntryImpl(
    allEntries === null ? partialEntries : allEntries,
    focusedEntryId
  );
};

const getNextSelectedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, partialEntries, selectedEntryId } = entryViewer;
  return getNextEntryImpl(
    allEntries === null ? partialEntries : allEntries,
    selectedEntryId
  );
};

const getPrevFocusedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, partialEntries, focusedEntryId } = entryViewer;
  return getPrevEntryImpl(
    allEntries === null ? partialEntries : allEntries,
    focusedEntryId
  );
};

const getPrevSelectedEntry = (entryViewer: EntryViewer): Entry | null => {
  const { allEntries, partialEntries, selectedEntryId } = entryViewer;
  return getPrevEntryImpl(
    allEntries === null ? partialEntries : allEntries,
    selectedEntryId
  );
};

export {
  create,
  focus,
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
