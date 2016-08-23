import { VNode, div } from '@cycle/dom';
import { State } from '../../type';

const view = ({ menu }: State): VNode => {
  return div('.nav', [
    div('.reload', ['R']),
    (menu ? div('.menu-disabled', ['H']) : div('.menu', ['H'])),
    div('.next', ['J']),
    div('.prev', ['K']),
    (menu ? div('.enter', ['L']) : div('.enter-disabled', ['L']))
  ]);
};

export { view };
