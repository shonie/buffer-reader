#!/usr/bin/env node

const bufferized = require('../lib');

async function main() {
  for await (const line of bufferized(process.stdin.setEncoding('utf8'))) {
    // process.stdout.write(line);
    console.log(line);
  }
}

main();
