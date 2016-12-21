import { VNode, div } from '@cycle/dom';
import { State } from '../type';

const view = ({ menu }: State): VNode => {
  const up = '\u25b2'; // U+25B2 BLACK UP-POINTING TRIANGLE
  const down = '\u25bc'; // U+25BC BLACK DOWN-POINTING TRIANGLE
  const right = '\u25b6'; // U+25B6 BLACK RIGHT-POINTING TRIANGLE
  const left = '\u25c0'; // U+25C0 BLACK LEFT-POINTING TRIANGLE
  return div('.nav', { class: { 'is-menu': menu } }, [
    div('.menu', [left]),
    div('.next', [down]),
    div('.prev', [up]),
    div('.enter', [right])
  ]);
};

export { view };
