const net = require('net');
const { PORT } = require('./constants');

const server = net.createServer(); // create server

server.listen(PORT, () => { // server listen for connections
  console.log('Server is listening on port 3000');
});

server.on('connection', (client) => {
  console.log(`Client has connected.`);
  client.write('You have connected.');
});