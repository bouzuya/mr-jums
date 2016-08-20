import { VNode, div } from '@cycle/dom';

const view = (): VNode => {
  return div('.nav', [
    div('.menu', ['H']),
    div('.next', ['J']),
    div('.prev', ['K']),
    div('.enter', ['L'])
  ]);
};

export { view };
