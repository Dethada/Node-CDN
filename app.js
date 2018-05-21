#!/usr/bin/env node

const formidable = require('formidable'),
    http = require('http'),
    util = require('util');

// set to taste
const URI = '/upload';
const ENCODING = 'utf-8';
const UPLOAD_DIR = 'images/';
const PORT = 9000;
const LOG_FILE = '/tmp/cdn.log';

// adds CORS Headers
function cors(res) {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'token');
}

const fs = require('fs');
function log(msg) {
  let stream = fs.createWriteStream(LOG_FILE, {flags:'a'});
  stream.write(msg + "\n");
  stream.end();
}

http.createServer((req, res) => {
  if (req.url === URI  && req.method.toLowerCase() === 'post' && req.headers['token'] === process.env.CDN_TOKEN) {
    // parse a file upload
    let form = new formidable.IncomingForm();
    form.encoding = ENCODING;
    form.keepExtensions = true;
    form.uploadDir = UPLOAD_DIR;

    form.parse(req, (err, fields, files) => {
      cors(res);
      res.writeHead(200, {'content-type': 'text/plain'});
      let details = JSON.stringify({files: files});
      log(details);
      res.end(details);
    });
  } else {
    cors(res);
    res.writeHead(200, {'content-type': 'text/html'});
    res.end('You are not allowed here.');
  }
}).listen(PORT);

console.log("Listening on port " + PORT + URI);
