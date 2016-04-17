import test from 'ava';
import V from '../lib/vector';

test('#size() returns the size of a vector', async t => {
  const fixtures = [
    [new V(), 0],
    [new V([1]), 1],
    [new V([0]), 1],
    [new V([1, 0]), 2],
    [new V([0, 1]), 2],
    [new V([0, 0]), 2]
  ];

  for (const [v, s] of fixtures) {
    t.is(v.size(), s);
  }
});

test('#get() returns the specified component of a vector', async t => {
  const v = new V([1, 0, 1, 1]);

  t.is(v.get(0), 1);
  t.is(v.get(1), 0);
  t.is(v.get(2), 1);
  t.is(v.get(3), 1);
});

test('.distance() returns the distance between two vectors', async t => {
  const fixtures = [
    [new V(), new V(), 0],
    [new V([1]), new V([1]), 0],
    [new V([1]), new V([0]), 1],
    [new V([1, 0]), new V([1, 0]), 0],
    [new V([1, 1]), new V([1, 0]), 1],
    [new V([0, 1]), new V([1, 1]), 1],
    [new V([0, 1]), new V([0, 0]), 1],
    [new V([0, 1]), new V([1, 0]), 2]
  ];

  for (const [u, v, d] of fixtures) {
    t.is(V.distance(u, v), d);
  }
});
