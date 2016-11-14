const net = require('net');
const config = require('config');
const {
  host,
  port
} = config.get('server');
const debug = require('debug')('file-o-phile:tcp-sender');

module.exports = (client) => {
  return {
    listRequest: () => {
      debug('Sending list request');
      client.write('LIST idh14sync/1.0');
      return true;
    },
    putRequest: (fileData) => {
      debug('Sending put request');
      client.write(`PUT idh14sync/1.0

      ${fileData}`);
      return true;
    }
  }

}