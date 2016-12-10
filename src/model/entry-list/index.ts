import { Entry } from '../../type';
import { currentPageEntries } from '../entry-viewer/current-page-entries';

export interface EmptyEntryList {
  _type: 'empty-entry-list';
}

export interface NonEmptyEntryList {
  _type: 'non-empty-entry-list';
  // assert(_entries.length > 0) && assert(_entries are ordered by desc)
  _entries: Entry[];
}

export type EntryList = EmptyEntryList | NonEmptyEntryList;

const emptyEntryList: EmptyEntryList = { _type: 'empty-entry-list' };

const createEmptyEntryList = (): EmptyEntryList => emptyEntryList;

const isEmptyEntryList = (
  entryList: EntryList
): entryList is EmptyEntryList => {
  return entryList._type === 'empty-entry-list';
};

const createNonEmptyEntryList = (entries: Entry[]): NonEmptyEntryList => {
  return {
    _type: 'non-empty-entry-list',
    _entries: entries
  };
};

const isNonEmptyEntryList = (
  entryList: EntryList
): entryList is NonEmptyEntryList => {
  // assert(entryList._entries.length > 0);
  // assert(entryList is ordered by desc)
  return entryList._type === 'non-empty-entry-list';
};

const createEntryList = (entries: Entry[]): EntryList => {
  if (entries.length === 0) {
    return createEmptyEntryList();
  } else {
    return createNonEmptyEntryList(entries);
  }
};

const getEntries = (entryList: EntryList): Entry[] => {
  if (isEmptyEntryList(entryList)) {
    return [];
  } else if (isNonEmptyEntryList(entryList)) {
    const { _entries } = entryList;
    return _entries;
  } else {
    throw new Error();
  }
};

const getFirstEntry = (nonEmptyEntryList: NonEmptyEntryList): Entry => {
  const { _entries } = nonEmptyEntryList;
  return _entries[0];
};

const getLastEntry = (nonEmptyEntryList: NonEmptyEntryList): Entry => {
  const { _entries } = nonEmptyEntryList;
  return _entries[_entries.length - 1];
};

const isFirstEntryId = (
  nonEmptyEntryList: NonEmptyEntryList,
  entryId: string
): boolean => {
  return getFirstEntry(nonEmptyEntryList).id === entryId;
};

const isLastEntryId = (
  nonEmptyEntryList: NonEmptyEntryList,
  entryId: string
): boolean => {
  return getLastEntry(nonEmptyEntryList).id === entryId;
};

const getPageEntries = (
  entryList: EntryList,
  offsetEntryId: string,
  maxCount: number
): Entry[] => {
  return currentPageEntries(getEntries(entryList), offsetEntryId, maxCount);
};

export {
  createEntryList,
  getEntries,
  getFirstEntry,
  getLastEntry,
  getPageEntries,
  isEmptyEntryList,
  isFirstEntryId,
  isLastEntryId,
  isNonEmptyEntryList
};
