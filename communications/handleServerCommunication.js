const config = require('config');
const { host, port } = config.get('server');
const debug = require('debug')('file-o-phile:tcp-receiver');
const {
    getFileContent,
    getHashFromFile,
    base64_decode,
    base64_encode
} = require('../util');

module.exports = ({ sender, socket }) => {
    console.log("Started receiver");
    socket.on('data', (data) => {
        try {
            message = data.toString().split('\n\n').filter(msg => msg.length);
            message = { command: message[0], json: message[1] };
            var json = JSON.parse(message.json);
            debug(json);
            json.files.forEach(function(data) {
                var fs = require('fs');
                console.log("Handling file " + data.filename + " with hash " + data.checksum);
                if (fs.existsSync('../folderToSync/' + data.filename)) {
                    console.log("The remote file " + data.filename + " does locally also excists");
                    getHashFromFile(data.filename).then((hash) => {
                        if (hash == data.checksum) {
                            console.log(data.filename + " has the same checksum remote as locally :-)");
                        } else {
                            // Todo move file locally to (1) VERSION and afterwards request file from server
                            console.log(data.filename + " has another checksum remote as locally :'(");
                        }
                        debug(hash);
                    }).catch(debug);
                } else {
                    // Todo request file from server
                    sender.getFile(data.filename);
                }
            });
        } catch (e) {
            return console.log(e);
        }
        debug(data.toString());
    });


    socket.on('end', () => {
        debug('disconnected from server');
    });
}