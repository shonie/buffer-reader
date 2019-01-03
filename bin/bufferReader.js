#!/usr/bin/env node

const BufferReader = require("../BufferReader");

let buffer = Buffer.from("");

process.stdin.on("data", chunk => {
  buffer = Buffer.concat([buffer, Buffer.from(chunk)]);
});

process.stdin.pipe(process.stdout);

process.stdin.on("end", () => {
  const opts = {
    buffer
  };
  new BufferReader(opts).setEncoding("hex").pipe(process.stdout);
});
