// Backwards-compatible entrypoint: invokes the unified master build compiler
const { buildAll } = require('./build-site.js');

if (require.main === module) {
  buildAll();
}

module.exports = { buildAll };
