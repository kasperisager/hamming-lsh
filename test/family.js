import test from 'ava';
import V from '../lib/vector';
import family from '../lib/family';

test('family() builds a family of base functions', async t => {
  const fixtures = [
    [4, new V([1, 4, 2, 3])]
  ];

  for (const [d, v] of fixtures) {
    const f = family(d);

    for (let i = 0, n = f.length; i < n; i++) {
      t.deepEqual(f[i](v), [v.get(i).toString(2)]);
    }
  }
});
