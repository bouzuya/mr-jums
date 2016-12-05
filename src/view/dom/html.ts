import {
  VNode,
  body,
  div,
  head,
  html,
  link,
  meta,
  script,
  title
} from '@cycle/dom';

import { parseInitialState } from '../../model/parse-initial-state';
import { StateData } from '../../type';
import { view as appView } from './app';

const view = (state: StateData): VNode => {
  return html({ lang: 'ja' }, [
    head([
      meta({ props: { charset: 'UTF-8' } }),
      title(['blog.bouzuya.net']),
      meta({
        props: {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1'
        }
      }),
      meta({
        props: {
          name: 'theme-color',
          content: '#4e6a41'
        }
      }),
      link({
        props: {
          rel: 'stylesheet', type: 'text/css', href: '/index.css'
        }
      }),
      link({
        props: {
          rel: 'icon', sizes: '192x192', href: '/images/favicon.png'
        }
      }),
      link({
        props: {
          rel: 'apple-touch-icon', sizes: '192x192', href: '/images/favicon.png'
        }
      }),
      script(`window.INITIAL_STATE = ${JSON.stringify(state)}`)
    ]),
    body([
      div('#app', [appView(parseInitialState(state))]),
      script({ props: { src: '/index.js' } }, [])
    ])
  ]);
};

export { view };
