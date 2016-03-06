import test from 'ava';
import family from '../lib/family';

test('family() builds a family of functions for the Hamming distance', async t => {
  const fixtures = [
    [4, [1, 4, 2, 3]]
  ];

  for (const [d, v] of fixtures) {
    const f = family(d);

    for (let i = 0, n = f.length; i < n; i++) {
      t.is(f[i](v), v[i]);
    }
  }
});
