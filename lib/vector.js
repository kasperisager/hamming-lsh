/**
 * Construct a vector consisting of binary components where truthy values represent 1 and falsy values represent 0.
 *
 * @constructor
 * @param {Array<number>} [cs=[]] The components of the vector.
 *
 * @example
 * const v = Vector([1, 0, 1]);
 */
export default function Vector(cs = []) {
  const l = cs.length;
  const c = {};

  for (let i = 0; i < l; i++) {
    if (cs[i]) {
      c[i] = true;
    }
  }

  /**
   * Get the number of components in the vector.
   *
   * @memberof Vector
   * @return {number} The number of components in the vector.
   *
   * @example
   * const v = Vector([1, 0, 0, 1]);
   * v.size();
   * // => 4
   */
  function size() {
    return l;
  }

  /**
   * Get the component at the specified index of the vector.
   *
   * @memberof Vector
   * @param {number} i The index of the component to get.
   * @return {number} The component at the index if found.
   *
   * @example
   * const v = Vector([1, 0, 1, 1]);
   * v.get(0);
   * // => 1
   */
  function get(i) {
    if (i >= l) {
      return;
    }

    return c[i] ? 1 : 0;
  }

  return {size, get};
}

/**
 * Compute the distance between two vectors.
 *
 * @param {Vector} u
 * @param {Vector} v
 * @return {number}
 * @private
 */
export function distance(u, v) {
  let d = 0;

  for (let i = 0, n = u.size(); i < n; i++) {
    if (u.get(i) !== v.get(i)) {
      d++;
    }
  }

  return d;
}
