#!/usr/bin/env node

const parseStdin = require('../lib/parseStdin');
const { splitIntoLines } = require('../lib/layout');

async function main() {
  const { stdin, stdout } = process;

  stdin.setEncoding('utf8');

  for await (const [utf8, hex] of parseStdin(process.stdin)) {
    const columnWidth = stdout.columns / 2;

    const columns = [
      {
        value: utf8,
        width: columnWidth,
      },
      { value: hex, width: columnWidth },
    ];

    for await (const line of splitIntoLines(columns)) {
      stdout.write(line);
    }
  }
}

main();
