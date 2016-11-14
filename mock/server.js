const net = require('net');
const debug = require('debug')('file-o-phile:mock-server');
module.exports = () => {
  debug('Mock server initializing');
  // make our mock server, should say goodbye and close
  const server = net.createServer((c) => {
    // 'connection' listener
    debug('client connected');
    c.on('data', function(data) {
  var response = data.toString().trim();

  if (/disconnect/.test(response)) {
    console.log("Client is diconnecting.");
    c.end('Disconnecting you now.\r\n');
  }
});
    c.write('hello\r\n');
    c.pipe(c);
  });
  server.on('error', (err) => {
    throw err;
  });
  server.listen(8080, () => {
    debug('server bound');
  });
}