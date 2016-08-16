import { VNode } from '@cycle/dom';
import { Entry } from '../../../type';

const view = (
  entries: Entry[],
  offset: string | null,
  count: number,
  render: (entry: Entry) => VNode
): VNode[] => {
  if (offset === null) return [];
  return entries
    .filter(({ id }) => id <= offset) // entries order by desc
    .filter((_, index) => index < count)
    .map(render);
};

export { view };
