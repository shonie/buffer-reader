const windowSize = require('window-size');
const { StringStream, chunksToLinesAsync } = require('@rauschma/stringio');
const R = require('ramda');

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

const flatten = async function* flatten(stream) {
  for await (const columns of stream) {
    for (const column of columns) {
      yield* chunksToLinesAsync(new StringStream(column.value));
    }
  }
};

async function* columnize(stream) {
  console.log(windowSize)
  const { width: windowWidth } = windowSize.get();
  
  const appendix = [];

  for await (const values of stream) {
    yield values.map((v, i, s) => {
      const width = windowWidth / s.length;

      const rawValue = appendix[i] !== undefined ? appendix[i] + v : v;

      appendix.splice(i, 1);

      let value;

      if (rawValue.length < width) {
        value = rawValue;
      } else {
        value = rawValue.slice(0, width);
        appendix.splice(i, 1, rawValue.slice(width));
      }

      console.log({
        value,
        width,
      });

      return {
        value,
        width,
      };
    });
  }
}

const layout = R.pipe(
  columnize,
  flatten
);

layout.composeLines = composeLines;

layout.map = map;

layout.flatten = flatten;

layout.columnize = columnize;

module.exports = layout;
