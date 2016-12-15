import * as fetch from 'isomorphic-fetch';

const myFetch: typeof fetch = typeof global === 'undefined'
  ? fetch : (<any>global).fetch.bind(global);

export { myFetch as fetch };
