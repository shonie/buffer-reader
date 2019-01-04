const { StringStream } = require('@rauschma/stringio');
const { expect } = require('chai');
const layout = require('../lib/layout');

describe('layout/composeLines', () => {
  it('do line-break if does not fit', () => {
    expect([...layout.composeLines('foo', 2)]).to.deep.equal(['fo', 'o']);
    expect([...layout.composeLines('   foobar baz', 5)]).to.deep.equal(['   fo', 'obar ', 'baz']);
  });
  it('does not do line-break if fits', () => {
    expect([...layout.composeLines('foo', 3)]).to.deep.equal(['foo']);
    expect([...layout.composeLines('', 0)]).to.deep.equal([]);
    expect([...layout.composeLines('f', 0)]).to.deep.equal([]);
  });
  it('preserves new lines', () => {
    expect([...layout.composeLines('foo\nbar\nbaz', 4)]).to.deep.equal(['foo\n', 'bar\n', 'baz']);
  });
});

describe('layout/concatColumnsLines', () => {
  it('concats lines of multiple columns', async () => {
    const columns = [{ value: 'foo\n', width: 3 }, { value: 'bar', width: 3 }];
    for await (const line of layout.flatten(columns)(new StringStream('baz'))) {
      expect(line).to.deep.equal('foobar');
    }
  });
});
