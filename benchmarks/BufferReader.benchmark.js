const { Suite } = require("benchmark");
const { Writable } = require("stream");
const fs = require("fs");
const path = require("path");
const BufferReader = require("../BufferReader");

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

const suite = new Suite();

const writableStream = getDummyWritableStream();

const otherWritableSteam = getDummyWritableStream();

const massiveText = fs.readFileSync(
  path.join(__dirname, "..", "fixtures", "PamelaAnderson.txt"),
  {
    encoding: "utf8"
  }
);

const massiveBuffer = Buffer.from(massiveText);

const reader = new BufferReader({
  buffer: massiveBuffer
});

suite
  .add("Plain write", () => {
    writableStream.write(massiveBuffer);
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
  .on("complete", () => {
    console.log(`Fastest is ${suite.filter("fastest").map("name")}`);
  })
  .run({ async: true });
