module.exports = async function* parse(stream) {
  for await (const chunk of stream) {
    yield [chunk, Buffer.from(chunk, 'utf8').toString('hex')];
  }
};
