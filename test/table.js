import test from 'ava';
import T from '../lib/table';
import V from '../lib/vector';

test('Table() constructs a lookup table for vectors of a given dimension', async t => {
  t.truthy(new T(6, 2, 3));
});

test('#size() returns the number of vectors in a lookup table', async t => {
  const table = new T(6, 2, 3);

  t.is(table.size(), 0);

  table.add(new V([0, 1, 0, 1, 1, 0]));
  table.add(new V([0, 1, 0, 0, 1, 0]));

  t.is(table.size(), 2);
});

test('#add() adds a vector to a lookup table', async t => {
  const table = new T(6, 2, 3);

  const v1 = new V([0, 1, 0, 1, 1, 0]);
  const v2 = new V([0, 1, 0, 0, 1, 0]);

  table.add(v1);
  table.add(v2);

  t.is(table.size(), 2);
  t.truthy(table.contains(v1));
  t.truthy(table.contains(v2));
});

test('#add() throws when adding a vector of a dimensionality different from the table', async t => {
  const table = new T(6, 2, 3);

  t.throws(() => table.add(new V([0, 1, 0])));
  t.throws(() => table.add(new V([0, 1, 0, 0])));
  t.throws(() => table.add(new V([0])));
});

test('#query() queries a lookup table for an approximate nearest neighbour of a vector', async t => {
  const table = new T(6, 2, 4);

  const v1 = new V([1, 1, 0, 1, 1, 1]);
  const v2 = new V([0, 1, 0, 0, 1, 0]);
  const v3 = new V([1, 0, 1, 1, 1, 1]);

  table.add(v1);
  table.add(v2);

  t.is(table.query(v3), v1);
});

test('#query() throws when querying a vector of a dimensionality different from the table', async t => {
  const table = new T(6, 2, 3);

  t.throws(() => table.query(new V([0, 1, 0])));
  t.throws(() => table.query(new V([0, 1, 0, 0])));
  t.throws(() => table.query(new V([0])));
});
