const { toHex } = require('./encoder');

function* composeLineIntoCells(string, columnWidth) {
  let cursor = 0;
  let slice = '';

  // eslint-disable-next-line no-cond-assign
  while ((slice = string.slice(cursor, (cursor += columnWidth)))) {
    yield slice;
  }
}

const layout = ({ separator, columnWidth }) =>
  async function* makeRows(reader) {
    let appendix = '';

    for await (const [utf8Encoded, hexEncoded] of reader) {
      for (const cell of composeLineIntoCells(utf8Encoded, columnWidth)) {
        const utf8Cell = cell.padEnd(columnWidth);

        let hexCell = `${appendix}${hexEncoded}${toHex('\n')}`;

        if (hexCell.length > columnWidth) {
          appendix = hexCell.slice(columnWidth);
          hexCell = hexCell.slice(0, columnWidth);
        } else {
          appendix = '';
        }

        yield `${utf8Cell}${separator}${hexCell}\n`;
      }
    }

    if (appendix) {
      for (const appendixCell of composeLineIntoCells(appendix, columnWidth)) {
        yield `${''.padEnd(columnWidth)}${separator}${appendixCell}\n`;
      }
    }
  };

layout.composeLineIntoCells = composeLineIntoCells;

module.exports = layout;
