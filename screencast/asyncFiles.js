const fs = require('fs');

// sync
// try {
//   let data = fs.readFileSync(__filename);
// } catch (e) {
//   console.error(err);
// }

// fs.exist fs.stat - check file

// async
fs.readFile(__filename, {encoding: 'utf-8'}, (err, data) => {
    "use strict";
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } else {
        console.log(data);
        // or data.toString()
        console.log(data[0]);
    }
});
