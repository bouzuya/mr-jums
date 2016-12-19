import * as express from 'express';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { join } from 'path';
import { requestHtml } from './request-html';

const main = () => {
  const server = express();
  server.use(morgan('combined'));
  server.use(compression());
  // __dirname === '/.tmp/es2015/src/server/'
  const publicDir = join(__dirname, '..', '..', '..', '..', 'public');
  server.use(express.static(publicDir));
  server.use((req, res) => {
    return void Promise.resolve(req.originalUrl)
      .then((path) => requestHtml(path))
      .then(
      (html) => ({ status: 200, body: html }),
      () => ({ status: 500, body: JSON.stringify({ message: 'ERROR' }) })
      )
      .then(({ status, body }) => void res.status(status).send(body));
  });
  const port = parseInt((process.env.PORT || '4000'), 10);
  console.log(`public dir: ${publicDir}`);
  console.log(`port      : ${port}`);
  server.listen(port);
};

main();
