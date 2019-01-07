exports.map = mapper =>
  async function* map(stream) {
    for await (const chunk of stream) {
      yield mapper(chunk);
    }
  };
