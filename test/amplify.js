import test from 'ava';
import V, * as Vector from '../lib/vector';
import distance from '../lib/distance';
import family, {random} from '../lib/family';
import {and, or} from '../lib/amplify';

test('and()', async t => {
  const f = random(or(and(family(10), 4), 4));

  const v1 = V(1, 0, 0, 1, 1, 1, 0, 1, 0, 1);
  const v2 = V(1, 1, 0, 1, 1, 0, 0, 1, 1, 1);
  const v3 = V(0, 1, 0, 0, 0, 1, 1, 0, 1, 0);
  const v4 = V(1, 1, 0, 0, 1, 1, 0, 1, 0, 1);

  const d = {};

  for (const v of [v1, v2, v3]) {
    for (const h of f(v)) {
      if (!(h in d)) {
        d[h] = new Set();
      }

      d[h].add(v);
    }
  }

  function query(d, q, r) {
    for (const h of f(q)) {
      const vs = d[h];

      if (!vs) {
        continue;
      }

      for (const v of vs) {
        if (distance(q, v) <= r) {
          return v;
        }
      }
    }

    return null;
  }

  console.log(query(d, v4, 4));
});
