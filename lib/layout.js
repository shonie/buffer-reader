const { StringStream, chunksToLinesAsync } = require('@rauschma/stringio');
const readline = require('readline');

function createLineComposer(string, columnWidth) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          if (this.cursor === undefined) {
            this.string = string;
            this.columnWidth = columnWidth;
            this.cursor = 0;
          }

          if (this.cursor >= this.string.length) {

            return {
              done: true,
            };
          } else {
            const value = this.string.slice(this.cursor, this.columnWidth);

            const result = {
              value,
              done: false,
            };

            this.cursor += this.columnWidth;

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
