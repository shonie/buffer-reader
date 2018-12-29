const { Readable } = require("stream");

module.exports = class BufferReader extends Readable {
  constructor(opts) {
    super(opts);

    if (typeof opts.buffer !== undefined) {
      this.buffer = Buffer.from(opts.buffer);

      this.offset = 0;
    } else {
      throw new Error("opts.buffer is required for BufferReader");
    }
  }

  _read(size) {
    if (this.offset > this.buffer.length) {
      // End reading
      this.push(null);

      return null;
    } else {
      // Reading
      const slice = this.buffer.slice(this.offset, size);

      this.push(slice);

      this.offset += size;

      return slice;
    }
  }
};
