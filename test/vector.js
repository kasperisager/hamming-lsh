import test from 'ava';
import V, * as Vector from '../lib/vector';

test('Vector() constructs a vector from a list of components', async t => {
  const v = V(1, 2, 3);
  t.same(v, [1, 2, 3]);
});

test('length() gets the length of a vector', async t => {
  const v = V(1, 2, 3);
  t.is(Vector.length(v), 3);
});

test('merge() constructs a vector from the concatenation of several vectors', async t => {

});

test('hash() hashes a vector', async t => {
  const v = V(1, 2, 3);
  t.is(Vector.hash(v), '@@1,2,3');
});
