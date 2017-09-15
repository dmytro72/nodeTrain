const {Server} = require('http');
const {parse} = require('url');

const server = new Server((req, res) => {
  "use strict";
  // console.log(req.method, req.url);
  const urlParsed = parse(req.url, true);
  // console.log(urlParsed);
  if (urlParsed.pathname === '/echo' && urlParsed.query.message) {
    res.end(urlParsed.query.message);
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

server.listen(3000, '127.0.0.1');

