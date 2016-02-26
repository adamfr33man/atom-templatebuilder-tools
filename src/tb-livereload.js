"use babel";

import {Notification} from 'atom';

const livereload = require('livereload'),
      fs = require('fs'),
      os = require('os'),
      path = require('path');

var watcher,
    lastLength = 0,
    logPath,
    reloadFile = path.join(os.tmpdir(), 'reload.html'),
    server = livereload.createServer(),
    connection;

server.watch(reloadFile);

exports.activate  = () => {
  console.log('TB LR My package was activated');

  watchTB();
};

exports.deactivate = () => {
  console.log('this package was deactivated');
  server.stop();
};

function watchTB() {
  // Setup WebSocket
  connection = new WebSocket('ws://localhost:2015/assembler-end-point');
  connection.onmessage = function(e) {
    let chunk = e.data;

    console.log('Server:', chunk);
    if(res = chunk.match(/Built client\s*(\S+)\s*(.*)"/) ) {
      console.log(res);
      atom.notifications.addSuccess('Built ' + res[1]);
      console.log('Reloading...');
      fs.closeSync(fs.openSync(reloadFile, 'w'));
    } else if(res = chunk.match(/Building client\s*(\S+)\s*(.*)"/) ) {
      atom.notifications.addInfo('Building ' + res[1] + '...');
      console.log(res);
    } else if(res = chunk.match(/Failed to build client\s*(\S+)\s*(\S+)\s/) ) {
      atom.notifications.addError('Failed Build for ' + res[1] + '...');
      console.log(res);
    }
  };
}
