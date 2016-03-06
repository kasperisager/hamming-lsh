import test from 'ava';
import distance from '../lib/distance';

test('distance() returns the Hamming distance between two vectors', async t => {
  const fixtures = [
    [[true, true], [true, false], 1],
    [[1, 3, 4, 2], [1, 2, 3, 2], 2]
  ];

  for (const [v1, v2, d] of fixtures) {
    t.is(distance(v1, v2), d, [v1, v2]);
  }
});
