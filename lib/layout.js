const { StringStream, chunksToLinesAsync } = require('@rauschma/stringio');
const { getWindowSize } = require('./helpers');

function* composeLines(string, columnWidth) {
  let cursor = 0;
  let slice = '';

  // eslint-disable-next-line no-cond-assign
  while ((slice = string.slice(cursor, (cursor += columnWidth)))) {
    yield slice;
  }
}

const map = iteratee =>
  async function* _map(stream) {
    for await (const chunk of stream) {
      yield iteratee(chunk);
    }
  };

const flatten = columns =>
  async function* flatten() {
    for (const column of columns) {
      yield* chunksToLinesAsync(new StringStream(column.value));
    }
  };

async function* columnize(stream) {
  const [width] = getWindowSize(process.stdout);

  for await (const values of stream) {
    yield values.map((value, _, sources) => ({
      value,
      width: width / sources.length,
    }));
  }
}
exports.composeLines = composeLines;

exports.map = map;

exports.flatten = flatten;

exports.columnize = columnize;
