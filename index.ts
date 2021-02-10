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
  let filename = pathname.substr(1);
  if (!filename) {
    filename = 'index.html';
  }
  fs.readFile(p.resolve(publicPath, filename), (error, data) => {
    if (error) {
      res.setHeader('Content-Type','text/plain; charset=utf-8')
      res.statusCode = 404;
      res.end('访问的路径文件不存在');
    } else {
      res.end(data);
    }
  });
});

server.listen(8888, () => {
  console.log(server.address());
});
