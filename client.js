const net = require('net');
// const fs = require('fs');
const { IP, PORT } = require('./constants');


const connect = function () {
  const conn = net.createConnection({
    host: IP,
    port: PORT
  });

  // conn.connect();

  // console.log(conn);

  conn.setEncoding('utf8');

  conn.on('connect', () => {
    conn.write('Hello from client!');
  });

  conn.on('data', (data) => {
    console.log(data);
  });

  // socket.connect(PORT, IP, conn.on())

  return conn;
};


module.exports = { connect };
