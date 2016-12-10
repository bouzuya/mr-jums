import { Entry } from '../../type';
import {
  EmptyEntryList, EntryList, NonEmptyEntryList,
  getPageEntries, getEntries, getFirstEntry, isEmptyEntryList
} from '../entry-list';
import { hasEntry } from '../entry-viewer/has-entry';

export interface NonEmptyPagedEntryList {
  _type: 'non-empty-paged-entry-list';
  _entryList: EntryList;
  _offset: string;
  _count: number;
}

export interface EmptyPagedEntryList {
  _type: 'empty-paged-entry-list';
}

export type PagedEntryList = EmptyPagedEntryList | NonEmptyPagedEntryList;

const emptyPagedEntryList: EmptyPagedEntryList = {
  _type: 'empty-paged-entry-list'
};

const createEmptyPagedEntryList = (): EmptyPagedEntryList => {
  return emptyPagedEntryList;
};

const isEmptyPagedEntryList = (
  pagedEntryList: PagedEntryList
): pagedEntryList is EmptyPagedEntryList => {
  return pagedEntryList._type === 'empty-paged-entry-list';
};

const createNonEmptyPagedEntryList = (
  allEntryList: NonEmptyEntryList,
  maxCountPerPage: number,
  offsetEntryId: string | null
): NonEmptyPagedEntryList => {
  return {
    _type: 'non-empty-paged-entry-list',
    _entryList: allEntryList,
    _offset: offsetEntryId === null
      ? getFirstEntry(allEntryList).id
      : hasEntry(getEntries(allEntryList), offsetEntryId)
        ? offsetEntryId : getFirstEntry(allEntryList).id,
    _count: maxCountPerPage
  };
}

const isNonEmptyPagedEntryList = (
  pagedEntryList: PagedEntryList
): pagedEntryList is NonEmptyPagedEntryList => {
  return pagedEntryList._type === 'non-empty-paged-entry-list';
};

const createPagedEntryList = (
  allEntryList: EntryList,
  maxCountPerPage: number,
  offsetEntryId: string | null
): PagedEntryList => {
  return isEmptyEntryList(allEntryList) || maxCountPerPage <= 0
    ? createEmptyPagedEntryList()
    : createNonEmptyPagedEntryList(
      allEntryList, maxCountPerPage, offsetEntryId
    );
};

const getAllEntries = (pagedEntryList: PagedEntryList): Entry[] => {
  if (isEmptyPagedEntryList(pagedEntryList)) {
    return [];
  } else if (isNonEmptyPagedEntryList(pagedEntryList)) {
    return getEntries(pagedEntryList._entryList);
  } else {
    throw new Error();
  }
};

const getCurrentPageEntries = (pagedEntryList: PagedEntryList): Entry[] => {
  if (isEmptyPagedEntryList(pagedEntryList)) {
    return [];
  } else if (isNonEmptyPagedEntryList(pagedEntryList)) {
    const { _entryList, _offset, _count } = pagedEntryList;
    return getPageEntries(_entryList, _offset, _count);
  } else {
    throw new Error();
  }
};

export {
  EntryList,
  EmptyEntryList,
  NonEmptyEntryList,
  createPagedEntryList,
  getAllEntries,
  getCurrentPageEntries
};
