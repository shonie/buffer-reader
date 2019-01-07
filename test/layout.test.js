const { expect } = require('chai');
const layout = require('../lib/layout');

describe('layout/composeLineIntoCells', () => {
  it('do line-break if does not fit', () => {
    expect([...layout.composeLineIntoCells('foo', 2)]).to.deep.equal(['fo', 'o']);
    expect([...layout.composeLineIntoCells('   foobar baz', 5)]).to.deep.equal(['   fo', 'obar ', 'baz']);
  });
  it('does not do line-break if fits', () => {
    expect([...layout.composeLineIntoCells('foo', 3)]).to.deep.equal(['foo']);
    expect([...layout.composeLineIntoCells('', 0)]).to.deep.equal([]);
    expect([...layout.composeLineIntoCells('f', 0)]).to.deep.equal([]);
  });
  it('preserves new lines', () => {
    expect([...layout.composeLineIntoCells('foo\nbar\nbaz', 4)]).to.deep.equal(['foo\n', 'bar\n', 'baz']);
  });
});
