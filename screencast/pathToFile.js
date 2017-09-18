const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const ROOT = path.normalize(__dirname + '/public');

http.createServer((req, res) => {
  "use strict";
  if (!checkAccess(req)) {
    res.statusCode = 403;
    res.end('Tell me the secret to access!');
    return;
  }
  sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

/**
 * Check to have user permission for file access
 * @param {http.IncomingMessage} req - request
 * @return {boolean} true if user has permission
 */
function checkAccess(req) {
  "use strict";
  return url.parse(req.url, true).query.secret === 'o_O';
}

/**
 * Check file path for validity and send file
 * @param {string} filePath - path to file
 * @param {http.ServerResponse} res - server response
 */
function sendFileSafe(filePath, res) {
  "use strict";
  try {
    filePath = decodeURIComponent(filePath);
  } catch (e) {
    res.statusCode = 400;
    res.end('BadRequest');
    return;
  }
  if (~filePath.indexOf('\0')) {
    res.statusCode = 400;
    res.end('Bad Request');
    return;
  }
  filePath = path.normalize(path.join(ROOT, filePath));
  if (filePath.indexOf(ROOT) !== 0) {
    res.statusCode = 404;
    res.end('File not found');
    return;
  }
  fs.stat(filePath, (err, stats) => {
    console.log(filePath);
    console.log(err);
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('File not found');
      return;
    }
    sendFile(filePath, res);
  });
}

/**
 * Send file
 * @param {string} filePath - valid path to file
 * @param {http.ServerResponse} res - server response
 */
function sendFile(filePath, res) {
  "use strict";
  // wrong implementation, need to use stream
  fs.readFile(filePath, (err, content) => {
    if (err) throw err;
    let mime = require('mime').getType(filePath);
    res.setHeader('Content-Type', mime + '; charset=utf-8');
    res.end(content);
  });
}
