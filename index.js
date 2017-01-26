const watch = require('./filewatching/watcher');
const localChangeHandler = require('./communications/localChangeHandler');
const tcpInitializer = require('./communications/tcpInitializer');
const tcpSender = require('./communications/tcpSender');
const tcpReceiver = require('./communications/tcpReceiver');

const mockServer = require('./mock/server');
const debug = require('debug')('file-o-phile:index');
// mockServer();

tcpInitializer.init()
  .then((socket) => ({
        receiver: tcpReceiver(socket, this),
        sender: tcpSender(socket)
      }))
      .then(comms => {
      watch(localChangeHandler(comms));
    }).catch(debug);