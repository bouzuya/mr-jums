import { VNode, div, del } from '@cycle/dom';
import { State } from '../../type';

const view = ({ menu }: State): VNode => {
  return div('.nav', [
    (menu ? del([div(['H'])]) : div('.menu', ['H'])),
    div('.next', ['J']),
    div('.prev', ['K']),
    (menu ? div('.enter', ['L']) : del([div(['L'])]))
  ]);
};

export { view };
