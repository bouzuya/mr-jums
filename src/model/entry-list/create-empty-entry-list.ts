import { EmptyEntryList } from './empty-entry-list';

const emptyEntryList: EmptyEntryList = { _type: 'empty-entry-list' };

const createEmptyEntryList = (): EmptyEntryList => emptyEntryList;

export { createEmptyEntryList };
