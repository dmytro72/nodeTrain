// show all events
const {Server} = require('http');

const server = new Server();

const emit = server.emit;

server.emit = (...args) => {
  console.log(args[0]); // eventName
  // mandatory return
  return emit.apply(server, args);
};

server.on('request', (req, res) => {
  // if (req.url === '/') {
    res.end('Hello, world!');
  // }
});

server.listen(8000);