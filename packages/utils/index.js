if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/arc-utils.min.cjs');
} else {
  module.exports = require('./dist/arc-utils.cjs');
}
