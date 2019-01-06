const { Readable } = require('stream');
const readline = require('readline');
const { width } = require('window-size');
const { composeLines } = require('./layout');

const columnWidth = width / 2;

// Actual width is smaller than half, as we append '|' as column separator
const columnInnerWidth = columnWidth - 2;

module.exports = class HexReader extends Readable {
  constructor(options) {
    super(options);

    if (!options.source) {
      this.emit('error', new Error(`options.source should be a valid readable stream`));
    }

    this.rl = readline.createInterface({
      input: options.source,
    });

    this.appendix = '';

    this.rl.on('line', line => {
      this.parseLine(line);
    });

    this.rl.on('close', () => {
      if (this.appendix) {
        for (const row of composeLines(this.appendix, columnInnerWidth)) {
          this.emit(`${''.padEnd(columnInnerWidth)}|${row}`);
        }
      }
    });
  }

  parseLine(line) {
    for (const raw of composeLines(line, columnInnerWidth)) {
      const utf8 = raw.padEnd(columnInnerWidth);

      let hex = `${this.appendix}${Buffer.from(`${line}\n`, 'utf8').toString('hex')}`;

      if (hex.length > columnInnerWidth) {
        this.appendix = hex.slice(columnInnerWidth);
        hex = hex.slice(0, columnInnerWidth);
      } else {
        this.appendix = '';
      }

      this.emit(`${utf8}|${hex}`);
    }
  }
};
