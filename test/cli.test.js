const { expect } = require("chai");
const { spawn } = require("child_process");
const { join } = require("path");

const binPath = join(__dirname, "..", "bin", "bufferReader.js");

const collectOutput = stream =>
  new Promise((resolve, reject) => {
    let data = "";

    stream.on("data", chunk => (data += chunk));

    stream.on("error", err => reject(err));

    stream.on("end", () => resolve(data));
  });

describe("cli", function() {
  this.timeout(10000000);

  it("Output is correct", async () => {
    const echo = spawn("echo", ["Hello, world!"]);

    const bufferize = spawn("node", [binPath]);

    echo.stdout.pipe(bufferize.stdin);

    const output = await collectOutput(bufferize.stdout);

    return expect(output).to.equal("Hello, world!\n48656c6c6f2c20776f726c64210a");
  });
});
