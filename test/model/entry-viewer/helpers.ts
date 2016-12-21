import { EntryViewer } from '../../../src/common/type';
import { create } from '../../../src/model/entry-viewer';

const newEntryViewer = (): EntryViewer => {
  const entries = new Array(31).fill(0).map((_, i) => 31 - i).map((n) => {
    const s = n < 10 ? '0' + n : n.toString(10);
    return { id: `2016-01-${s}`, title: `Entry ${s}`, body: `Entry Body ${s}` };
  });
  return create(entries);
};

export { newEntryViewer };
