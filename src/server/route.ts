import { result, route as route1, router } from 'spa-town';

import { Route } from './type';

const buildRouter = (): (path: string) => Route => {
  const year = /^\d{4}$/;
  const month = /^\d{2}$/;
  const date = /^\d{2}$/;
  return router([
    route1('entry-detail', '/{year}/{month}/{date}/', { year, month, date }),
    route1('entry-list', '/{year}/{month}/{date}/related/', { year, month, date })
  ], result('entry-list', {}));
};

const route = buildRouter();

export { route };
