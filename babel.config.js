/* eslint-disable require-jsdoc-except/require-jsdoc */

const { parse, relative } = require('path');
const { aliases } = require('./conf.repo');

module.exports = (api) => {
  api.cache(true);
  
  // map alias' so files resolve
  const _aliases = {};
  const aliasKeys = [];
  Object.keys(aliases).forEach((alias) => {
    _aliases[alias] = aliases[alias];
    aliasKeys.push(alias);
  });
  const aliasRegEx = new RegExp(`^(${ aliasKeys.join('|') })`);
  const moduleResolver = ['module-resolver', {
    alias: _aliases,
    resolvePath(sourcePath, currentFile, opts) {
      const match = sourcePath.match(aliasRegEx);
      
      if( match ){
        const alias = match[1];
        const transformed = sourcePath.replace(alias, _aliases[alias]);
        let relativePath = relative(
          parse(currentFile).dir,
          transformed
        );
        
        if(!relativePath.startsWith('.')) relativePath = `./${ relativePath }`;
        
        return relativePath;
      }
      
      return sourcePath;
    },
  }];
  
  // Settings used for building npm distributable module
  // https://babeljs.io/docs/en/6.26.3/babel-preset-env
  return {
    env: {
      cjs: {
        plugins: [
          moduleResolver,
          'emotion',
        ],
        presets: [
          ['@babel/preset-env', {
            modules: 'commonjs',
            targets: {
              node: '8.9.1',
            },
          }],
          '@babel/preset-react',
        ],
      },
      esm: {
        plugins: [
          moduleResolver,
          'emotion',
        ],
        presets: [
          ['@babel/preset-env', {
            modules: false,
          }],
          '@babel/preset-react',
        ],
      },
    },
  };
};
