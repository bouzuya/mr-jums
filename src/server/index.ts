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
      .then((path) => route(path))
      .then((route) => init(route, config))
      .then((state) => render(state, config))
      .then(
      (html) => ({ status: 200, body: html }),
      () => ({ status: 500, body: JSON.stringify({ message: 'ERROR' }) })
      )
      .then(({ status, body }) => void res.status(status).send(body));
  });
  console.log(`public dir: ${config.publicDir}`);
  console.log(`port      : ${config.port}`);
  server.listen(config.port);
};

main();
