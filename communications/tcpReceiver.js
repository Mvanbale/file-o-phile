const net = require('net');
const config = require('config');
const {host, port} = config.get('server');
const debug = require('debug')('file-o-phile:tcp-receiver');
const tcpSender = require('./tcpSender');
const theSender = null;
const {
  getFileContent,
  getHashFromFile,
  base64_decode,
  base64_encode
} = require('../util');

module.exports = (client, sender)=>{
  console.log("Started receiver");
  console.log(sender);
  this.theSender = sender;
  

client.on('data', (data) => {
  try {
    message = data.toString().split('\n\n').filter(msg => msg.length);
    message = {command: message[0], json: message[1]};
    var json = JSON.parse(message.json);
    json.files.forEach(function(data){
      var fs = require('fs');
      console.log("Handling file " + data.filename + " with hash " + data.checksum);
      if (fs.existsSync('../folderToSync/' + data.filename)) {
        console.log("The remote file " + data.filename + " does locally also excists");
          getHashFromFile(data.filename).then((hash)=>{
            if(hash == data.checksum){
              console.log(data.filename + " has the same checksum remote as locally :-)");
            }
            else {
              // Todo move file locally to (1) VERSION and afterwards request file from server
              console.log(data.filename + " has another checksum remote as locally :'(");
            }
          debug(hash);
        }).catch(debug);
      }
      else {
        // Todo request file from server
        theSender.getFile(data.filename);
      }
    });
  } catch (e) {
    return console.error(e);
  }  
  debug(data.toString());
});


client.on('end', () => {
  debug('disconnected from server');
});
}