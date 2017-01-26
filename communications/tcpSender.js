const config = require('config');
const {
    host,
    port
} = config.get('server');
const {
    getFileContent,
    getHashFromFile,
    base64_decode,
    base64_encode
} = require('../util');
const debug = require('debug')('file-o-phile:tcp-sender');
const checksumRegistry = require('../checksumRegistry');

module.exports = (client) => {
    return {
        addFile: async function addFile(path, hash) {
            debug('Sending add request');
            const fileContent = await getFileContent(path);
            const fileHash = await getHashFromFile(path);
            const responseObject = {
                "filename": path,
                "checksum": fileHash,
                "content": fileContent
            }
            debug({
                responseObject
            });
            client.write(`PUT idh14sync/1.0

${JSON.stringify(responseObject)}`);

        },
        updateFile: async function updateFile(path, hash) {
            debug('Sending update request');
            const fileContent = await getFileContent(path);
            const fileHash = await getHashFromFile(path);
            const responseObject = {
                "filename": path,
                "checksum": fileHash,
                "original_checksum": checksumRegistry.get(path),
                "content": fileContent
            }
            debug({
                responseObject
            });
            client.write(`PUT idh14sync/1.0

${JSON.stringify(responseObject)}`);

        },
        deleteFile: async function deleteFile(path) {
            debug('Sending delete request');
            const responseObject = {
                "filename": path
            }
            client.write(`DELETE idh14sync/1.0

${JSON.stringify(responseObject)}`);
        },
        listFiles: async function listFiles() {
            debug('Sending listFiles request');
            const responseObject = {}
            console.log({
                responseObject
            });
            client.write(`LIST idh14sync/1.0

${JSON.stringify(responseObject)}`);

        },
        getFile: async function getFile(path) {
            debug('Sending GET request');
            const responseObject = {
                "filename": path
            }
            client.write(`GET idh14sync/1.0

${JSON.stringify(responseObject)}`);
        },
    }

}