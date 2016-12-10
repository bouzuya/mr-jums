import { EmptyEntryList, isEmptyEntryList } from './empty-entry-list';
import { EntryList } from './entry-list';
import {
  NonEmptyEntryList,
  isNonEmptyEntryList,
  isLastEntryId,
  isFirstEntryId,
  getLastEntry,
  getFirstEntry
} from './non-empty-entry-list';
import { createEntryList } from './create-entry-list';
import { getEntries } from './get-entries';
import { getPageEntries } from './get-page-entries';

export {
  EmptyEntryList,
  EntryList,
  NonEmptyEntryList,
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
