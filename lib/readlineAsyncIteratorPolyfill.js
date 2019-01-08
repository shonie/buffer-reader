const eventEmitterToAsyncIterable = require('./eventEmitterToAsyncIterable');

module.exports = reader => ({
  [Symbol.asyncIterator]() {
    if (reader[Symbol.asyncIterator]) {
      return reader[Symbol.asyncIterator]();
    }
    return eventEmitterToAsyncIterable(reader, 'line');
  },
});
