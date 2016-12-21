import { NonEmptyPagedEntryList } from './non-empty-paged-entry-list';
import { EmptyPagedEntryList } from './empty-paged-entry-list';

export type PagedEntryList = EmptyPagedEntryList | NonEmptyPagedEntryList;
