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

import { serialize } from '../model/state/serialize';
import { State } from '../type/state';
import { view as appView } from './app';

const view = (
  state: State, scriptUrl: string, styleUrl: string, imageBaseUrl: string
): VNode => {
  const faviconUrl = `${imageBaseUrl}/images/favicon.png`;
  const entry = state.selectedEntryDetail;
  return html({ lang: 'ja' }, [
    head([
      meta({ props: { charset: 'UTF-8' } }),
      title([
        (entry === null
          ? '' : entry.id + ' ' + entry.title + ' - ') +
        'blog.bouzuya.net'
      ]),
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
      meta({
        props: {
          name: 'google-site-verification',
          content: 'WIpgFHN5YFkpju_QBxqY2IoTI6QV2OP0Xhc5WGq9U0g'
        }
      }),
      link({
        props: {
          rel: 'stylesheet', type: 'text/css', href: styleUrl
        }
      }),
      link({ props: { rel: 'icon', sizes: '192x192', href: faviconUrl } }),
      link({
        props: { rel: 'apple-touch-icon', sizes: '192x192', href: faviconUrl }
      }),
      script(`window.INITIAL_STATE = ${JSON.stringify(serialize(state))}`)
    ]),
    body([
      div('#app', [appView(state)]),
      script({ props: { src: scriptUrl } }, [])
    ])
  ]);
};

export { view };
