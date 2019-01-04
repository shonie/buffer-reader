const { Suite } = require("benchmark");
const { Writable } = require("stream");
const fs = require("fs");
const path = require("path");
const BufferReader = require("../lib/BufferReader");

const getDummyWritableStream = () =>
  new Writable({
    write(chunk, encoding, cb) {
      try {
        cb(null, chunk);
      } catch (err) {
        cb(err);
      }
    }
  });

const writableStream = getDummyWritableStream();

const otherWritableSteam = getDummyWritableStream();

const buffer = fs.readFileSync(
  path.join(__dirname, "..", "fixtures", "1Gb.txt")
);

const reader = new BufferReader({
  buffer
});

new Suite()
  .add("Plain write", () => {
    writableStream.write(buffer);
  })
  .add("Pipe method", () => {
    let chunk;
    while ((chunk = reader._read(16384))) {
      otherWritableSteam.write(chunk);
    }

    otherWritableSteam.end();
  })
  .on("cycle", event => {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
