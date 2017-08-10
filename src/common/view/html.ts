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
import * as htmlescape from 'htmlescape';

import { serialize } from '../model/state/serialize';
import { State } from '../type/state';
import { view as appView } from './app';

const view = (
  state: State, _scriptUrl: string, _styleUrl: string, imageBaseUrl: string
): VNode => {
  const faviconUrl = `${imageBaseUrl}/images/favicon.png`;
  const entry = state.selectedEntryDetail;
  const escapedInitialState = htmlescape(serialize(state));
  const title1 = (entry === null
    ? '' : entry.id + ' ' + entry.title + ' - ') +
    'blog.bouzuya.net';
  const ogTitle = title1;
  const ogUrl = 'http://blog.bouzuya.net' + (entry === null
    ? '/'
    : '/' + entry.id.split('-').join('/') + '/');
  const ogImageUrl = 'http://blog.bouzuya.net/images/favicon.png';
  const ogDescription = entry === null ? 'blog.bouzuya.net' : entry.description;
  const ogSiteName = 'blog.bouzuya.net';
  return html({ lang: 'ja', prefix: 'og: http://ogp.me/ns#' }, [
    head([
      meta({ props: { charset: 'UTF-8' } }),
      title([title1]),
      meta({ props: { name: 'robots', content: 'index, follow' } }),
      meta({
        props: {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1'
        }
      }),
      meta({ props: { name: 'twitter:card', content: 'summary' } }),
      meta({ props: { name: 'twitter:site', content: '@bouzuya' } }),
      meta({ props: { name: 'twitter:creator', content: '@bouzuya' } }),
      meta({ props: { name: 'og:title', content: ogTitle } }),
      meta({ props: { name: 'og:url', content: ogUrl } }),
      meta({ props: { name: 'og:image', content: ogImageUrl } }),
      meta({ props: { name: 'og:description', content: ogDescription } }),
      meta({ props: { name: 'og:site_name', content: ogSiteName } }),
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
      // link({
      //   props: {
      //     rel: 'stylesheet', type: 'text/css', href: styleUrl
      //   }
      // }),
      link({ props: { rel: 'alternate', type: 'application/atom+xml', href: '/atom.xml' } }),
      link({ props: { rel: 'icon', sizes: '192x192', href: faviconUrl } }),
      link({
        props: { rel: 'apple-touch-icon', sizes: '192x192', href: faviconUrl }
      }),
      script(`window.INITIAL_STATE = ${escapedInitialState};`)
    ]),
    body([
      div('#app', [appView(state)]),
      // script({ props: { src: scriptUrl } }, [])
    ])
  ]);
};

export { view };
