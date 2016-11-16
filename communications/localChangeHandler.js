const fs = require('fs');
const Promise = require('bluebird');
const readFile = Promise.promisify(require("fs").readFile);
const debug = require('debug')('file-o-phile:command-handler');
const { getFileContent,getHashFromFile, base64_decode,base64_encode } = require('../util');
const checksumRegistry = require('../checksumRegistry');
// this will handle any function calls linked to our events
module.exports = (comms) => ({
  // if a file is added
  addedLocally: (path) => {
    getHashFromFile(path).then((hash)=>{
      debug(`${path} was added this is the hash:`);
      debug(hash);
      checksumRegistry.set(path, hash);
      debug(comms);
      comms.sender.addFile(path, hash);
    }).catch(debug);
  },
  // if a file is changed
  changedLocally: (path) => {
    getHashFromFile(path).then((hash)=>{
      debug(`${path} was changed this is the hash:`);
      debug(hash);
      comms.sender.updateFile(path, hash);
    }).catch(debug);
  },
  // if a file is deleted
  deletedLocally: (path) => {
    debug(`${path} was deleted this is the hash:`);
    comms.sender.deleteFile(path);
  }
})