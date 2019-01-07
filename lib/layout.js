function* composeLineIntoCells(string, columnWidth) {
  let cursor = 0;
  let slice = '';

  // eslint-disable-next-line no-cond-assign
  while ((slice = string.slice(cursor, (cursor += columnWidth)))) {
    yield slice;
  }
}

exports.makeRows = async function* makeRows(reader, { separator, columnWidth }) {
  let appendix = '';

  for await (const line of reader) {
    for (const cell of composeLineIntoCells(line, columnWidth)) {
      const utf8 = cell.padEnd(columnWidth);

      let hex = `${appendix}${Buffer.from(`${line}\n`, 'utf8').toString('hex')}`;

      if (hex.length > columnWidth) {
        appendix = hex.slice(columnWidth);
        hex = hex.slice(0, columnWidth);
      } else {
        appendix = '';
      }

      yield `${utf8}${separator}${hex}`;
    }
  }

  if (appendix) {
    for (const raw of composeLineIntoCells(appendix, columnWidth)) {
      yield `${''.padEnd(columnWidth)}${separator}${raw}`;
    }
  }
};

