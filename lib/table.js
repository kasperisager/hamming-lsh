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
  // Construct a family of hash functions to use for the table.
  const f = select(or(and(family(d), k), l));

  // Construct a map to contain the different sets of vector hashes.
  const t = new Map();

  let length = 0;

  /**
   * Get the number of vectors in the lookup table.
   *
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
   * @param {Vector} v The vector to add to the lookup table.
   *
   * @example
   * const v = Vector(1, 0, 1, 0);
   * t.add(v);
   */
  function add(v) {
    if (v.length !== d) {
      throw new Error('Incorrect vector dimensionality');
    }

    length++;

    for (const h of f(v)) {
      if (!t.has(h)) {
        t.set(h, new Set());
      }

      t.get(h).add(v);
    }
  }

  /**
   * Query the lookup table for the nearest neighbour of a query vector `q` within distance `r`.
   *
   * @param {Vector} q The query vector to look up the nearest neighbour of.
   * @param {number} r The maximum allowed distance between the query vector and the neighbour.
   * @return {Vector} The nearest neighbouring vector if found.
   *
   * @example
   * const q = Vector(0, 1, 0, 1);
   * const r = 2;
   * t.query(q, r);
   * // => Vector(...)
   */
  function query(q, r) {
    if (q.length !== d) {
      throw new Error('Incorrect vector dimensionality');
    }

    for (const h of f(q)) {
      const vs = t.get(h);

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

  return {add, query, size};
}
