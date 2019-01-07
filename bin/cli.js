#!/usr/bin/env node

const readline = require('readline');
const { width: terminalWidth } = require('window-size');
const { makeRows } = require('../lib/layout');

async function main() {
  const reader = readline.createInterface({
    input: process.stdin,
  });

  const rowsGenerator = makeRows(reader, {
    separator: '|',
    columnWidth: terminalWidth / 2 - 2,
  });

  for await (const row of rowsGenerator) {
    console.log(row);
  }
}

main();
