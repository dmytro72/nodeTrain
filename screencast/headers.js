const {Server} = require('http');
const {parse} = require('url');

const server = new Server((req, res) => {
  "use strict";
  // console.log(req.headers);
  const urlParsed = parse(req.url, true);
  if (urlParsed.pathname === '/echo' && urlParsed.query.message) {
    res.setHeader('Cache-control', 'no-cache, no-store, must-revalidate');
    res.statusCode = 200;
    res.end(urlParsed.query.message);
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

server.listen(3000, '127.0.0.1');

