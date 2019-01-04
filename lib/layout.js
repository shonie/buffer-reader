const { StringStream, chunksToLinesAsync } = require('@rauschma/stringio');
const readline = require('readline');

function createLineComposer(string, columnWidth) {
  return {
    [Symbol.iterator]() {
      this.cursor = 0;

      return {
        next() {
          if (!'cursor' in this) {
            this.cursor = 0;
          }
          if (this.cursor >= string.length) {
            return {
              done: true,
            };
          } else {
            const value = string.slice(this.cursor, columnWidth);

            const result = {
              value,
              done: false,
            };

            this.cursor += columnWidth;

            return result;
          }
        },
      };
    },
  };
}

async function* mapLines(input, iteratee) {
  const interface = readline.createInterface({
    input,
  });

  for await (const line of interface) {
    yield iteratee(line, interface);
  }
}

async function* splitIntoLines(columns) {
  for (const column of columns) {
    yield* chunksToLinesAsync(new StringStream(column.value));
  }
}

function* layout() {}

exports.mapLines = mapLines;

exports.splitIntoLines = splitIntoLines;

exports.layout = layout;
