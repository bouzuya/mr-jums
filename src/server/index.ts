import * as express from 'express';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { requestHtml } from './request-html';
import { create } from '../common/model/server-config/create';

const main = () => {
  const config = create();
  const server = express();
  server.use(morgan('combined'));
  server.use(compression());
  server.use(express.static(config.publicDir));
  server.use((req, res) => {
    return void Promise.resolve(req.originalUrl)
      .then((path) => requestHtml(path, config))
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
