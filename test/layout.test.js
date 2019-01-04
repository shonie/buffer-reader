const { StringStream } = require('@rauschma/stringio');
const { expect } = require('chai');
const { composeLines, flatten } = require('../lib/layout');

describe('layout/composeLines', () => {
  it('do line-break if does not fit', () => {
    expect([...composeLines('foo', 2)]).to.deep.equal(['fo', 'o']);
    expect([...composeLines('   foobar baz', 5)]).to.deep.equal(['   fo', 'obar ', 'baz']);
  });
  it('does not do line-break if fits', () => {
    expect([...composeLines('foo', 3)]).to.deep.equal(['foo']);
    expect([...composeLines('', 0)]).to.deep.equal([]);
    expect([...composeLines('f', 0)]).to.deep.equal([]);
  });
  it('preserves new lines', () => {
    expect([...composeLines('foo\nbar\nbaz', 4)]).to.deep.equal(['foo\n', 'bar\n', 'baz']);
  });
});

describe('layout/concatColumnsLines', () => {
  it('concats lines of multiple columns', async () => {
    const columns = [{ value: 'foo\n', width: 3 }, { value: 'bar', width: 3 }];
    for await (const line of flatten(columns)(new StringStream('baz'))) {
      expect(line).to.deep.equal('foobar');
    }
  });
});
