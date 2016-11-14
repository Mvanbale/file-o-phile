const config = require('config');

const chokidar = require('chokidar');
const thingsToIgnore = config.get('regexIgnore');

const debug = require('debug')('file-o-phile:file-watcher');

const watcher = chokidar.watch('.', {
  ignored: thingsToIgnore
});

module.exports = (clientCommunications) => {
  debug(`We were given the following ignore REGEX: ${thingsToIgnore}`);
  debug('Initializing file watching.');
  watcher
    .on('add', path => {
      clientCommunications.added(path);
    })
    .on('change', path => {
      clientCommunications.changed(path);
    })
    .on('unlink', path => {
      clientCommunications.deleted(path);
    })
    .on('ready', () => {
      debug('Initial scan complete. Ready for changes');
    });

}