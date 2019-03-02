const { resolve } = require('path');

const ROOT = resolve(__dirname, './');
const SRC = `${ ROOT }/src`;

module.exports = {
  aliases: {
    ROOT,
    SRC,
  },
};