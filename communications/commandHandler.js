const fs = require('fs');
const Promise = require('bluebird');
const readFile = Promise.promisify(require("fs").readFile);
const debug = require('debug')('file-o-phile:command-handler');


// generates our hash
const makeHash = (data) => {
  return require('crypto').createHash('sha1').update(data).digest('hex')
}


// gets the file content and shoves it into our makehash function, returns the hash
const getHashFromFile = (path) => {
  return readFile(path).then(makeHash);
}

// this will handle any function calls linked to our events
module.exports = (comms) => ({
  // if a file is added
  added: (path) => {
    getHashFromFile(path).then((hash)=>{
      debug(`${path} was added this is the hash:`);
      debug(hash);
      debug(comms);
      comms.sender.listRequest();
    });
  },
  // if a file is changed
  changed: (path) => {
    getHashFromFile(path).then((hash)=>{
      debug(`${path} was changed this is the hash:`);
      debug(hash);
    });
  },
  // if a file is deleted
  deleted: (path) => {
    debug(`${path} was changed this is the hash:`);
  }
})