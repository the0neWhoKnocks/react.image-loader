/* eslint-disable require-jsdoc-except/require-jsdoc */

const { exists, readFile, readFileSync } = require('fs');
const { join, normalize, parse, resolve } = require('path');
const http = require('http');
const url = require('url');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { renderStylesToString } = require('emotion-server');
const { cache } = require('emotion');
const { CacheProvider } = require('@emotion/core');
const App = require('./src/App').default;
const template = require('./src/template').default;

const STATIC_DIR = 'dist';
const port = +process.env.PORT || 3001;
const mimeTypes = {
  '.css': 'text/css',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'aplication/font-sfnt',
};

const handleRootRequest = (res) => {
  const bundleScripts = JSON.parse(readFileSync(
    resolve(__dirname, './dist/manifest.json'),
    'utf8'
  ));
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(template({
    bundleScripts: Object.keys(bundleScripts).map(
      (key) => `${ STATIC_DIR }/${ bundleScripts[key] }`
    ),
    rootContent: renderStylesToString(
      renderToString(
        <CacheProvider value={cache}>
          <App />
        </CacheProvider>
      )
    ),
  }));
};

const handleStaticFile = (res, file) => {
  exists(file, (exist) => {
    if(!exist) {
      handleError(res, 404, `File ${ file } not found!`);
      return;
    }

    // read file from file system
    readFile(file, (err, data) => {
      if(err){
        handleError(res, 500, `Error reading file: ${ err }.`);
      }
      else{
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = parse(file).ext;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeTypes[ext] || 'text/plain' );
        // only cache files for a minute to verify images load properly
        res.setHeader('Cache-Control', 'max-age=60000' );
        res.end(data);
      }
    });
  });
};

const handleError = (res, code, msg) => {
  res.statusCode = code;
  res.end(msg);
};

const requestHandler = (req, res) => {
  // extract URL path
  // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
  // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
  // by limiting the path to current directory only
  const cleanPath = normalize( url.parse(req.url).pathname ).replace(/^(\.\.[/\\])+/, '');
  
  // root path
  if( cleanPath === '/' ){
    handleRootRequest(res);
  }
  // file request
  else if( /\.[a-z]{2,4}/.test(cleanPath) ){
    const pathPrefix = (!cleanPath.startsWith(`/${ STATIC_DIR }`))
      ? `/${ STATIC_DIR }`
      : '';
    handleStaticFile(res, join(__dirname, `${ pathPrefix }${ cleanPath }`));
  }
  // everything else
  else{
    console.log('Unhandled request:', req.url);
    handleError(res, 404, 'Page Not Found');
  }
};

http
  .createServer(requestHandler)
  .listen(port, (err) => {
    if(err) throw err;
    console.log(`Server running at http://localhost:${ port }/`);
  });
