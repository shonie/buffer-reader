#!/usr/bin/env node

const readline = require('readline');
const { width: terminalWidth } = require('window-size');
const R = require('ramda');
const { map } = require('../lib/helpers');
const layout = require('../lib/layout');
const { toHex } = require('../lib/encoder');

const separator = '|';

const columnWidth = terminalWidth / 2 - 2;

const run = stream =>
  R.pipe(
    map(chunk => [chunk, toHex(chunk)]),
    layout({ separator, columnWidth })
  )(stream);

async function main() {
  const reader = readline.createInterface({
    input: process.stdin,
  });

  for await (const row of run(reader)) {
    process.stdout.write(row);
  }
}

main();
