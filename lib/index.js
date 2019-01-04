const R = require('ramda');
const parse = require('./parser');
const { columnize } = require('./layout');

module.exports = stream =>
  R.pipe(
    parse,
    columnize
  )(stream);
