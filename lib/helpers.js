const windowSize = require('window-size');

exports.map = mapper =>
  async function* map(stream) {
    for await (const chunk of stream) {
      yield mapper(chunk);
    }
  };

exports.getWindowWidth = () => (windowSize ? windowSize.width : process.stdout.columns);
