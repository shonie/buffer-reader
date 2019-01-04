const { expect } = require("chai");
const { Readable } = require('stream');
const BufferReader = require("../lib/BufferReader");

describe("BufferReader", () => {
  it("Should be a valid readable stream", () => {
    let reader = new BufferReader({
      buffer: Buffer.from("Foo")
    });

    expect(reader).to.be.an.instanceof(Readable);
  })
  it("Should emit buffer data when reading", () => {
    let reader = new BufferReader({
      buffer: Buffer.from("Foo")
    });

    return new Promise(resolve => {
      reader.on("data", chunk => {
        expect(chunk).to.be.an.instanceof(Buffer);
        resolve();
      });
    });
  });
});
