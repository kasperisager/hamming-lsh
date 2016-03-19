import {distance} from './vector';
import family, {select} from './family';
import {and, or} from './amplify';

/**
 * @constructor
 * @param {number} d
 * @param {number} k
 * @param {number} l
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
   * @return {number}
   */
  function size() {
    return length;
  }

  /**
   * Add a vector `v` to the lookup table.
   *
   * @param {Vector} v
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
   * @param {Vector} q
   * @param {number} r
   * @return {Vector}
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
