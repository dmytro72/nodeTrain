let i = 0;

const count = function (req, res) {
  "use strict";
  i+= 1;
  res.end(i.toString());
};

module.exports = {
  count
};