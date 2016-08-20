import { VNode, div, span } from '@cycle/dom';
import { Entry } from '../../type';

const view = (entry: Entry): VNode => {
  return div('.entry', [
    div('.header', [
      span('.id', [entry.id]),
      span('.title', [entry.title])
    ])
  ]);
};

export { view };
