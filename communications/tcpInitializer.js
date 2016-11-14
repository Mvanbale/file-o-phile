const net = require('net');
const config = require('config');
const Promise = require('bluebird');
const {
  host,
  port
} = config.get('server');

const debug = require('debug')('file-o-phile:tcp-initializer');

module.exports.init = () =>
    Promise.try(function () {
      debug('returning socket');

      return net.connect({
        port,
        host
      }, ()=>{});
  });