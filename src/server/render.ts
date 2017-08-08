import { VNode } from '@cycle/dom';
import { State } from '../common/type/state';
import { view as htmlView } from '../common/view/html';
import { ServerConfig } from '../common/type/server-config';

// FIXME
const vnodeToString: (vnode: VNode) => string = require('snabbdom-to-html');

const render = (state: State, config: ServerConfig): string => {
  const vnode = htmlView(
    state, config.scriptUrl, config.styleUrl, config.imageBaseUrl
  );
  return '<!DOCTYPE html>' + vnodeToString(vnode);
};

export { render };
