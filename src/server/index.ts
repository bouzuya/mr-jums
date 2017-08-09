import * as express from 'express';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { create } from '../common/model/server-config/create';
import { init } from './init';
import { render } from './render';
import { route } from './route';

const main = () => {
  const config = create();
  const server = express();
  server.use(morgan('combined'));
  server.use(compression());
  server.use(express.static(config.publicDir));
  server.use((req, res) => {
    return void Promise.resolve(req.originalUrl)
      .then((path) => ({ path, route: route(path) }))
      .then(({ path, route }): Promise<{ status: 301; url: string; } | { status: 200; body: string; } | { status: 500; body: string; }> => {
        if (route.name === 'permanent-redirect') {
          const url = path.replace(/\/[^\/]*\/$/, '/');
          return Promise.resolve<{ status: 301; url: string; }>({ status: 301, url });
        } else {
          return Promise.resolve(route)
            .then((route) => init(route, config))
            .then((state) => render(state, config))
            .then(
            (html) => ({ status: 200, body: html }),
            () => ({ status: 500, body: JSON.stringify({ message: 'ERROR' }) })
            ) as Promise<{ status: 200; body: string; } | { status: 500; body: string; }>;
        }
      })
      .then((response) => {
        if (response.status === 301) {
          res.redirect(response.status, response.url);
        } else {
          res.status(response.status).send(response.body);
        }
      });
  });
  console.log(`public dir: ${config.publicDir}`);
  console.log(`port      : ${config.port}`);
  server.listen(config.port);
};

main();
