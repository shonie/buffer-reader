const R = require('ramda');
const parse = require('./parser');
const layout = require('./layout');

module.exports = stream =>
  R.pipe(
    parse,
    layout
  )(stream);
