const {Server} = require('http');

// same as http.createServer((req, res) => ...)
// or new Server((req, res) => {});
const server = new Server();

server.on('request', (req, res) => {
  "use strict";
  // empty
  // res.end('hello')
});

server.listen(8000);