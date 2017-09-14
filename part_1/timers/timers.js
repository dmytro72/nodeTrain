// В какой момент срабатывают - до или после чтения файла
const fs = require('fs');

fs.open(__filename, 'r', (err, fd) => {
  "use strict";
  console.log('IO!');
});

setImmediate(() => {
  "use strict";
  console.log('immediate');
});

process.nextTick(() => {
  "use strict";
  console.log('nextTick');
});

new Promise((resolve) => {
  "use strict";
  resolve('promise');
}).then(console.log);

console.log('start!');
