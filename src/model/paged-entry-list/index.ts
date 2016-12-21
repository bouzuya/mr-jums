import {
  EmptyPagedEntryList,
  Entry,
  NonEmptyPagedEntryList,
  PagedEntryList
} from '../../common/type';
import {
  EmptyEntryList, EntryList, NonEmptyEntryList,
  createEntryList,
  findNextEntry as findNextEntry1,
  findPrevEntry as findPrevEntry1,
  getPageEntries,
  getEntries,
  getFirstEntry,
  hasEntry,
  isEmptyEntryList,
  isLastEntryId as isLastEntryId1,
  isFirstEntryId as isFirstEntryId1
} from '../entry-list';

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
      : hasEntry(allEntryList, offsetEntryId)
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

const isFirstEntryId = (
  pagedEntryList: PagedEntryList,
  entryId: string
): boolean => {
  const entryList = createEntryList(getAllEntries(pagedEntryList));
  if (isEmptyEntryList(entryList)) return false;
  return isFirstEntryId1(entryList, entryId);
};

const isFirstEntryIdInCurrentPage = (
  pagedEntryList: PagedEntryList,
  entryId: string
): boolean => {
  const entryList = createEntryList(getCurrentPageEntries(pagedEntryList));
  if (isEmptyEntryList(entryList)) return false;
  return isFirstEntryId1(entryList, entryId);
};

const isLastEntryId = (
  pagedEntryList: PagedEntryList,
  entryId: string
): boolean => {
  const entryList = createEntryList(getAllEntries(pagedEntryList));
  if (isEmptyEntryList(entryList)) return false;
  return isLastEntryId1(entryList, entryId);
};

const isLastEntryIdInCurrentPage = (
  pagedEntryList: PagedEntryList,
  entryId: string
): boolean => {
  const entryList = createEntryList(getCurrentPageEntries(pagedEntryList));
  if (isEmptyEntryList(entryList)) return false;
  return isLastEntryId1(entryList, entryId);
};

const findNextEntry = (
  pagedEntryList: PagedEntryList,
  entryId: string
): Entry | null => {
  const entryList = createEntryList(getAllEntries(pagedEntryList));
  return findNextEntry1(entryList, entryId);
};

const findPrevEntry = (
  pagedEntryList: PagedEntryList,
  entryId: string
): Entry | null => {
  const entryList = createEntryList(getAllEntries(pagedEntryList));
  return findPrevEntry1(entryList, entryId);
};

export {
  EntryList,
  EmptyEntryList,
  NonEmptyEntryList,
  PagedEntryList,
  createPagedEntryList,
  findNextEntry,
  findPrevEntry,
  getAllEntries,
  getCurrentPageEntries,
  getMaxCountPerPage,
  getOffsetEntryId,
  hasEntryId,
  hasEntryIdInCurrentPage,
  isEmptyPagedEntryList,
  isFirstEntryId,
  isFirstEntryIdInCurrentPage,
  isLastEntryId,
  isLastEntryIdInCurrentPage,
  isNonEmptyPagedEntryList,
  offset
};
