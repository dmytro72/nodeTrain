const {Server} = require('http');
const fs = require('fs');

new Server((req, res) => {
  "use strict";
  if (req.url === '/big.html') {
    // without streams
    // fs.readFile('big.html', (err, content) => {
    //   if (err) {
    //     res.statusCode = 500;
    //     res.end('Server error');
    //   } else {
    //     res.setHeader('content-Type', 'text/html; charset=utf-8');
    //     res.end(content);
    //   }
    // });
    // use streams
    let file = new fs.ReadStream('big.html');
    sendFile(file, res);
  }
}).listen(3000);

// method on
// function sendFile(file, res) {
//   "use strict";
//   file.on('readable', write);
//   function write() {
//     let fileContent = file.read();
//     if (fileContent && !res.write(fileContent)) {
//       file.removeListener('readable', write);
//       res.once('drain', () => {
//         file.on('readable', write);
//         write();
//       });
//     }
//   }
//   file.on('end', () => {
//     res.end();
//   });
// }

// method pipe
function sendFile(file, res) {
  "use strict";
  file.pipe(res);
  file.on('error', (err) => {
    res.statusCode = 500;
    res.end('Server Error');
    console.error(err);
  });
  file
    .on('open', () => {
      console.log('open');
    })
    .on('close', () => {
      console.log('close');
    });
  res.on('close', () => {
    file.destroy();
  });
}
