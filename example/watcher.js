/* eslint-disable require-jsdoc-except/require-jsdoc */

import http from 'http';
import { create } from 'browser-sync';
import nodemon from 'nodemon';

const browserSync = create();
const port = +process.env.PORT || 8080;
const LOG_PREFIX = '[WATCHER]';

const checkServer = () => new Promise((rootResolve, rootReject) => {
  let count = 0;
  const check = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      const serverAddress = `http://localhost:${ port }`;
      
      console.log(`${ LOG_PREFIX } Pinging ${ serverAddress }`);
      http.get(serverAddress, (res) => resolve())
        .on('error', (err) => reject());
    }, 1000);
  });
  const handleError = () => {
    if(count < 3){
      ping();
      count++;
    }
    else{
      rootReject();
    }
  };
  const handleSuccess = () => { rootResolve(); };
  const ping = () => {
    check()
      .then(handleSuccess)
      .catch(handleError);
  };
  
  ping();
});

nodemon({
  delay: 500,
  script: './example/server.js',
  watch: [
    // WP bundled new code
    './example/dist/manifest.json',
    // The server has updated
    './example/server.js',
  ],
})
  .on('restart', () => {
    console.log(`${ LOG_PREFIX } Server restarting because file(s) changed`);
    
    checkServer()
      .then(() => {
        console.log('Server has fully started');
        browserSync.reload();
      })
      .catch(() => {
        console.log("Couldn't detect the server, a manual reload may be required");
      });
  });

// https://www.browsersync.io/docs/options
browserSync.init({
  ghostMode: false, // don't mirror interactions in other browsers
  // logLevel: 'debug',
  open: false,
  port: port + 1,
  proxy: `localhost:${ port }`,
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: (snippet) => snippet,
    },
  },
  ui: {
    port: port + 2,
  },
});

function killWatcher(evType) {
  console.log(`${ LOG_PREFIX } Killing watcher (${ evType })`);
  nodemon.emit('quit');
  process.exit(0);
}

process.on('SIGINT', killWatcher.bind(null, 'SIGINT'));
process.on('SIGTERM', killWatcher.bind(null, 'SIGTERM'));
process.on('SIGUSR2', killWatcher.bind(null, 'SIGUSR2'));
