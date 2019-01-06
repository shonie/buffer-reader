exports.composeLines = function* composeLines(string, columnWidth) {
  let cursor = 0;
  let slice = '';

  // eslint-disable-next-line no-cond-assign
  while ((slice = string.slice(cursor, (cursor += columnWidth)))) {
    yield slice;
  }
};
