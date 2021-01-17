/* eslint-disable no-console */

'use strict';

const net = require('net');
const fs = require('fs');
const { PORT } = require('./constants');

const server = net.createServer();

const handleFiles = (conn) => {
  conn.on('data', (data) => {
    console.log('Test');
    let fixedFileName = data.slice(0, data.length - 1);
    console.log(data);
    let stream = fs.createReadStream(fixedFileName);
    stream.on('data', (chunk) => {
      conn.write(chunk);
      // console.log(chunk);
    });
    stream.on('end', () => {
      console.log('END');
      setTimeout(() => conn.write('END'), 1000);
    });
  });
};

server.on('connection', (connection) => {
  connection.setEncoding('utf8');
  const conn = connection;
  console.log('Client has connected.');
  // conn.write('You have connected.');
  handleFiles(conn);
});

server.listen(PORT, () => { // server listen for connections
  console.log('Server is listening on port 3000');
});
