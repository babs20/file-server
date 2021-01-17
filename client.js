/* eslint-disable no-console */

'use strict';

const net = require('net');
const fs = require('fs');
const { IP, PORT } = require('./constants');

const conn = net.createConnection({
  host: IP,
  port: PORT
});

let fileType = '';

const stdin = process.stdin;
// stdin.setRawMode(true);
stdin.setEncoding('utf8');
stdin.resume();
stdin.on('data', (key) => {
  if (key === '\u0003') {
    process.exit();
  } else {
    fileType = key.slice(key.length - 4, key.length - 1);
    console.log(fileType);
    conn.write(key);
  }
});

let fileData = '';

const writeFile = (data) => {
  // let toBuffer64 = data.toString('base64');
  let writeStream = fs.createWriteStream('file.' + fileType);
  // console.log(toBuffer64);
  writeStream.write(data, 'base64', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('file written');
      fileData = '';
    }
  });
};

const createDataString = (chunk) => {
  fileData += chunk.toString('base64');
};

conn.on('data', (data) => {
  let compareEnd = Buffer.from('END');
  if (Buffer.compare(compareEnd, data) === 0) {
    writeFile(fileData);
  } else {
    createDataString(data);
  }
});
