import { div, VNode } from '@cycle/dom';
import { Entry } from '../../type';

const view = (entry: Entry): VNode => {
  return div('.entry', [
    div('.header', [entry.title]),
    div('.body', [entry.body])
  ]);
};

export { view };
