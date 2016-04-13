import test from 'ava';
import V from '../lib/vector';
import family from '../lib/family';
import {and, or} from '../lib/amplify';

test('and() amplifies a family of functions by concatenation of hashes', async t => {
  const f = and(family(6), 3);
  const v = new V([1, 1, 1, 1, 1, 1]);

  for (const h of f) {
    const hs = h(v);
    const [h1] = hs;

    t.is(hs.length, 1);
    t.is(h1, '111');
  }
});

test('or() amplifies a family of functions by extension of hashes', async t => {
  const f = or(family(6), 3);
  const v = new V([1, 1, 1, 1, 1, 1]);

  for (const h of f) {
    const hs = h(v);
    const [h1, h2, h3] = hs;

    t.is(hs.length, 3);
    t.is(h1, '1');
    t.is(h2, '1');
    t.is(h3, '1');
  }
});
