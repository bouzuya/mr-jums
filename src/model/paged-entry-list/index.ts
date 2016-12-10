import { Entry } from '../../type';
import {
  EmptyEntryList, EntryList, NonEmptyEntryList,
  createEntryList, getPageEntries, getEntries, getFirstEntry, isEmptyEntryList
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

const getMaxCountPerPage = (pagedEntryList: PagedEntryList): number => {
  if (isEmptyPagedEntryList(pagedEntryList)) {
    return 0;
  } else if (isNonEmptyPagedEntryList(pagedEntryList)) {
    const { _count } = pagedEntryList;
    return _count;
  } else {
    throw new Error();
  }
};

const getOffsetEntryId = (
  nonEmptyPagedEntryList: NonEmptyPagedEntryList
): string => {
  const { _offset } = nonEmptyPagedEntryList;
  return _offset;
};

const hasEntryId = (
  pagedEntryList: PagedEntryList,
  entryId: string
): boolean => {
  if (isEmptyPagedEntryList(pagedEntryList)) {
    return false;
  } else if (isNonEmptyPagedEntryList(pagedEntryList)) {
    return getAllEntries(pagedEntryList).some(({ id }) => {
      return id === entryId;
    });
  } else {
    throw new Error();
  }
};

const hasEntryIdInCurrentPage = (
  pagedEntryList: PagedEntryList,
  entryId: string
): boolean => {
  if (isEmptyPagedEntryList(pagedEntryList)) {
    return false;
  } else if (isNonEmptyPagedEntryList(pagedEntryList)) {
    return getCurrentPageEntries(pagedEntryList).some(({ id }) => {
      return id === entryId;
    });
  } else {
    throw new Error();
  }
};

const offset = (
  pagedEntryList: PagedEntryList,
  entryId: string
): PagedEntryList => {
  return createPagedEntryList(
    createEntryList(getAllEntries(pagedEntryList)),
    getMaxCountPerPage(pagedEntryList),
    entryId
  );
};

export {
  EntryList,
  EmptyEntryList,
  NonEmptyEntryList,
  createPagedEntryList,
  getAllEntries,
  getCurrentPageEntries,
  getMaxCountPerPage,
  getOffsetEntryId,
  hasEntryId,
  hasEntryIdInCurrentPage,
  isEmptyPagedEntryList,
  isNonEmptyPagedEntryList,
  offset
};
