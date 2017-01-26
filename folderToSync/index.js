const watch = require('./fileWatching/watcher');
const localChangeHandler = require('./communications/localChangeHandler');
const tcpInitializer = require('./communications/tcpInitializer');
const tcpSender = require('./communications/tcpSender');
const handleServerCommunication = require('./communications/handleServerCommunication');

const mockServer = require('./mock/server');
const debug = require('debug')('file-o-phile:index');
// mockServer();

tcpInitializer.init()
    .then((socket) => ({
        sender: tcpSender(socket),
        socket
    }))
    .then(comms => {
        watch(localChangeHandler(comms));
        handleServerCommunication(comms);
    }).catch((err) => {
        debug(`Failed to make a connection, the error we received was: 
      -------
      
      ${err}
      
      ------`)
    });