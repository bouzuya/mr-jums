import { MenuCommand } from '../../command';
import { State } from '../../type/state';

const menu = (state: State, _: MenuCommand): State => {
  return Object.assign({}, state, { menu: true });
};

export { menu };
