const R = require('ramda');
const encode = require('./encoder');
const layout = require('./layout');

module.exports = stream =>
  R.pipe(
    encode,
    layout
  )(stream);
