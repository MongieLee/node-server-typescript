import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
server.on('request', (req: IncomingMessage, res: ServerResponse) => {
  const { url: path, method, headers } = req;
  const publicPath = p.resolve(__dirname, 'public');
  const { pathname } = url.parse(path);
  switch (pathname) {
    case '/':
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      fs.readFile(p.resolve(publicPath, 'index.html'), (error, data) => {
        if (error) throw error;
        res.end(data.toString());
      });
      break;
    case '/main.js':
      res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
      fs.readFile(p.resolve(publicPath, 'main.js'), (error, data) => {
        if (error) throw error;
        res.end(data.toString());
      });
      break;
    case '/style.css':
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
      fs.readFile(p.resolve(publicPath, 'style.css'), (error, data) => {
        if (error) throw error;
        res.end(data.toString());
      });
      break;
    default:
      res.statusCode = 404;
      res.end();
  }
});

server.listen(8888, () => {
  console.log(server.address());
});
