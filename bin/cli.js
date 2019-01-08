#!/usr/bin/env node

const readline = require('readline');
const R = require('ramda');
const { map, getWindowWidth } = require('../lib/helpers');
const layout = require('../lib/layout');
const { toHex } = require('../lib/encoder');
const readlineAsyncIteratorPolyfill = require('../lib/readlineAsyncIteratorPolyfill');

const separator = '|';

const columnWidth = getWindowWidth() / 2 - 2;

const run = stream =>
  R.pipe(
    map(chunk => [chunk, toHex(chunk)]),
    layout({ separator, columnWidth })
  )(stream);

async function main() {
  const reader = readline.createInterface({
    input: process.stdin,
  });

  for await (const row of run(readlineAsyncIteratorPolyfill(reader))) {
    process.stdout.write(row);
  }
}

main();
