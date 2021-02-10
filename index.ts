import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
const publicPath = p.resolve(__dirname, 'public');

server.on('request', (req: IncomingMessage, res: ServerResponse) => {
  const { url: path, method, headers } = req;
  const { pathname } = url.parse(path);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (method !== 'GET') {
    res.statusCode = 200;
    res.end('服务器不接受非get请求外的方式，这是个假的响应');
    return;
  }
  let filename = pathname.substr(1);
  if (!filename) {
    filename = 'index.html';
  }
  fs.readFile(p.resolve(publicPath, filename), (error, data) => {
    if (error) {
      if (error.errno === -2) {
        res.statusCode = 404;
        fs.readFile(p.resolve(publicPath, '404.html'), (error, data) => {
          res.end(data);
        });
      } else if (error.errno === -21) {
        res.statusCode = 403;
        res.end('无权查看目录');
      } else {
        res.statusCode = 500;
        res.end('服务器繁忙');
      }
      console.log(error);
    } else {
      res.end(data);
    }
  });
});

server.listen(8888, () => {
  console.log(server.address());
});
