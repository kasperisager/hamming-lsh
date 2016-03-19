import test from 'ava';
import V, {distance} from '../lib/vector';

test('Vector() constructs a vector from a list of components', async t => {
  const fixtures = [
    [V(1, 0, 1), 0b101],
    [V(0, 1, 0), 0b010],
    [V(1, 0, 0, 1), 0b1001]
  ];

  for (const [v, u] of fixtures) {
    t.is(v.value, u);
  }
});

test('Vector() allows indexed access to vector components', async t => {
  const v = V(1, 0, 1, 1);

  t.is(v[0], 1);
  t.is(v[1], 0);
  t.is(v[2], 1);
  t.is(v[3], 1);
});

test('.length returns the size of a vector', async t => {
  const fixtures = [
    [V(), 0],
    [V(1), 1],
    [V(0), 1],
    [V(1, 0), 2],
    [V(0, 1), 2],
    [V(0, 0), 2]
  ];

  for (const [v, s] of fixtures) {
    t.is(v.length, s);
  }
});

test('#distance() returns the distance between two vectors', async t => {
  const fixtures = [
    [V(), V(), 0],
    [V(1), V(1), 0],
    [V(1), V(0), 1],
    [V(1, 0), V(1, 0), 0],
    [V(1, 1), V(1, 0), 1],
    [V(0, 1), V(1, 1), 1],
    [V(0, 1), V(0, 0), 1],
    [V(0, 1), V(1, 0), 2]
  ];

  for (const [u, v, d] of fixtures) {
    t.is(distance(u, v), d);
  }
});
