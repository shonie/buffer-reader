#!/usr/bin/env node

const bufferized = require('../lib');

async function main() {
  const { stdin, stdout } = process;

  for await (const line of bufferized(stdin.setEncoding('utf8'))) {
    stdout.write(line.toString());
  }
}

main();
