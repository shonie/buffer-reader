#!/usr/bin/env node

const readline = require('readline');
const { width } = require('window-size');
const { composeLines } = require('../lib/layout');

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  let appendix = '';

  const columnWidth = width / 2;

  // Actual width is smaller than half, as we append '|' as column separator
  const columnInnerWidth = columnWidth - 2;

  rl.on('line', line => {
    for (const raw of composeLines(line, columnInnerWidth)) {
      const utf8 = raw.padEnd(columnInnerWidth);

      let hex = `${appendix}${Buffer.from(`${line}\n`, 'utf8').toString('hex')}`;

      if (hex.length > columnInnerWidth) {
        appendix = hex.slice(columnInnerWidth);
        hex = hex.slice(0, columnInnerWidth);
      } else {
        appendix = '';
      }

      console.log(utf8, '|', hex);
    }
  });

  rl.on('close', () => {
    // console.log('appendix', appendix)
    if (appendix) {
      for (const raw of composeLines(appendix, columnInnerWidth)) {
        console.log(''.padEnd(columnInnerWidth), '|', raw);
      }
    }
  });
}

main();
