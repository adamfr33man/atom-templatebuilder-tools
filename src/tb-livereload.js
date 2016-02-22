"use babel";

import {Notification} from 'atom';

var livereload = require('livereload'),
    fs = require('fs'),
    os = require('os'),
    path = require('path'),
    $ = require('jquery');

var watcher,
    lastLength = 0,
    logPath,
    reloadFile = path.join(os.tmpdir(), 'reload.html'),
    server = livereload.createServer();

server.watch(reloadFile);

console.log('tb-livereload starting');

exports.activate  = () => {
  console.log('TB LR My package was activated');

  logPath = path.join(atom.config.get('atom-templatebuilder-tools.tbPath'), 'connector.log');

  console.log('Log path:', logPath);

  watchLogFile(logPath);
};


exports.deactivate = () => {
  console.log('this package was deactivated');
  server.stop();
};

function getLogDiff(notify = true) {
  fs.readFile(logPath,'utf-8', (err, data) => {
    if (err)
      throw err;

    var chunk = data.substr(lastLength);
    console.log(chunk);
    lastLength = data.length;

    // Look for stuff in the chunk
    if(notify) {
      var res;
      if(res = chunk.match(/-\s*built client\s*(\S+)\s*(.*)/) ) {
        console.log(res);
        atom.notifications.addSuccess('Built ' + res[1]);
        console.log('Reloading...');
        fs.closeSync(fs.openSync(reloadFile, 'w'));
      } else if(res = chunk.match(/-\s*requesting build for\s*(\S+)\s*(.*)/) ) {
        atom.notifications.addInfo('Building ' + res[1] + '...');
        console.log(res);
      }
    }
  });
}

function watchLogFile(newFile) {
  if(typeof newFile === 'undefined') {
    atom.notifications.addError('ERROR: Could not tail log file.', {
      dismissable: true,
      detail: 'Check settings for atom-templatebuilder-tools package'
    });
    return;
  }

  // Check the file exists
  fs.stat(newFile, function(err, stats) {
    if(err) {
      atom.notifications.addError('ERROR: Log file does not exist.', {
        dismissable: true,
        detail: 'Check settings for atom-templatebuilder-tools package or that file exists in ' + newFile
      });

      return;
    }

    logPath = newFile;
    watcher = fs.watch(logPath, {}, (event, filename) => {
      console.log('Change in:', filename);
      getLogDiff();
    });
  });

}
