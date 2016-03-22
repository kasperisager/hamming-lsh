import test from 'ava';
import V, {distance} from '../lib/vector';

test('.size() returns the size of a vector', async t => {
  const fixtures = [
    [V(), 0],
    [V([1]), 1],
    [V([0]), 1],
    [V([1, 0]), 2],
    [V([0, 1]), 2],
    [V([0, 0]), 2]
  ];

  for (const [v, s] of fixtures) {
    t.is(v.size(), s);
  }
});

test('.get() returns the specified component of a vector', async t => {
  const v = V([1, 0, 1, 1]);

  t.is(v.get(0), 1);
  t.is(v.get(1), 0);
  t.is(v.get(2), 1);
  t.is(v.get(3), 1);
});

test('#distance() returns the distance between two vectors', async t => {
  const fixtures = [
    [V(), V(), 0],
    [V([1]), V([1]), 0],
    [V([1]), V([0]), 1],
    [V([1, 0]), V([1, 0]), 0],
    [V([1, 1]), V([1, 0]), 1],
    [V([0, 1]), V([1, 1]), 1],
    [V([0, 1]), V([0, 0]), 1],
    [V([0, 1]), V([1, 0]), 2]
  ];

  for (const [u, v, d] of fixtures) {
    t.is(distance(u, v), d);
  }
});
