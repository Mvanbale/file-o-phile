const net = require('net');
const config = require('config');
const {host, port} = config.get('server');
const debug = require('debug')('file-o-phile:tcp-receiver');

module.exports = (client)=>{

client.on('data', (data) => {
  debug(data.toString());
});


client.on('end', () => {
  debug('disconnected from server');
});
}