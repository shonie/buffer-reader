module.exports = async function* parseStdin(stdin) {
  for await (const chunk of stdin) {
    yield [chunk, Buffer.from(chunk, "utf8").toString("hex")];
  }
};
