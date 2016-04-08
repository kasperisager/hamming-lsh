import {distance} from './vector';
import family, {select} from './family';
import {and, or} from './amplify';

/**
 * Construct a lookup table for vectors of dimensionality `d` where vectors are hashed using `k`-width hash values
 * (random vector projections) into `l` sets of hashes.
 *
 * @constructor
 * @param {number} d The number of dimensions of vectors in the table.
 * @param {number} k The width of each vector hash.
 * @param {number} l The number of hash sets to use.
 *
 * @example
 * const d = 4;
 * const k = 2;
 * const l = 2;
 * const t = Table(d, k, l);
 */
export default function Table(d, k, l) {
  if (k > d || l > d) {
    throw new Error('Amplification parameters cannot be greater than d');
  }

  const f = select(or(and(family(d), k), l));
  const t = {};

  for (let i = 0; i < d; i++) {
    t[i] = {};
  }

  let length = 0;

  /**
   * Get the number of vectors in the lookup table.
   *
   * @memberof Table
   * @return {number} The number of vectors in the lookup table.
   *
   * @example
   * t.add(Vector(...));
   * t.size();
   * // => 1
   */
  function size() {
    return length;
  }

  /**
   * Add a vector `v` to the lookup table.
   *
   * @memberof Table
   * @param {Vector} v The vector to add to the lookup table.
   *
   * @example
   * const v = Vector([1, 0, 1, 0]);
   * t.add(v);
   */
  function add(v) {
    if (v.size() !== d) {
      throw new Error('Incorrect vector dimensionality');
    }

    length++;

    const hs = f(v);

    for (let i = 0, n = hs.length; i < n; i++) {
      const h = hs[i];
      const b = (t[i][h] = t[i][h] ? t[i][h] : []);

      b[b.length] = v;
    }
  }

  /**
   * Query the lookup table for the nearest neighbour of a query vector `q`.
   *
   * @memberof Table
   * @param {Vector} q The query vector to look up the nearest neighbour of.
   * @return {Vector} The nearest neighbouring vector if found.
   *
   * @example
   * const q = Vector([0, 1, 0, 1]);
   * t.query(q);
   * // => Vector(...)
   */
  function query(q) {
    if (q.size() !== d) {
      throw new Error('Incorrect vector dimensionality');
    }

    const hs = f(q);

    let bc = null;
    let bd = Infinity;

    for (let i = 0, n = hs.length; i < n; i++) {
      const vs = t[i][hs[i]];

      if (!vs) {
        continue;
      }

      for (let j = 0, m = vs.length; j < m; j++) {
        const c = vs[j];
        const d = distance(q, c);

        if (d < bd) {
          bc = c;
          bd = d;
        }
      }
    }

    return bc;
  }

  /**
   * Check if the lookup table contains a specific vector.
   *
   * @param {Vector} v The vector to check for.
   * @return {boolean} `true` if the table contains the vector, otherwise `false`.
   */
  function contains(v) {
    if (v.size() !== d) {
      throw new Error('Incorrect vector dimensionality');
    }

    const hs = f(v);

    for (let i = 0, n = hs.length; i < n; i++) {
      const vs = t[i][hs[i]];

      if (!vs) {
        continue;
      }

      for (let j = 0, m = vs.length; j < m; j++) {
        if (v === vs[j]) {
          return true;
        }
      }
    }

    return false;
  }

  return {size, add, query, contains};
}
