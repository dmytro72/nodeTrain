const fs = require('fs');

// fs.ReadStream наследует от stream.Readable
let stream = new fs.ReadStream(__filename, {encoding: 'utf-8'});

stream.on('readable', () => {
  "use strict";
  let data = stream.read();
  console.log(data);
});

stream.on('end', () => {
  "use strict";
  console.log('THE END');
});

stream.on('error', (err) => {
  "use strict";
  if (err.code === 'ENOENT') {
    console.log('Файл не найден.');
  } else {
    console.error(err);
  }
});
