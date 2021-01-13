const net = require('net');
const { IP, PORT } = require('./constants');

const conn = net.createConnection({
  host: IP,
  port: PORT
});

conn.setEncoding('utf8');

conn.on('connect', () => {
  conn.write('Hello from client!');
});

conn.on('data', (data) => {
  console.log(data);
});