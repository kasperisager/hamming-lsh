export default class Vector {
  /**
   * Construct a vector consisting of binary components where truthy values represent 1 and falsy values represent 0.
   *
   * @param {Array<number>} [cs=[]] The components of the vector.
   *
   * @example
   * const v = Vector([1, 0, 1]);
   */
  constructor(cs = []) {
    const l = this.l = cs.length;
    const c = this.c = [];
    const s = this.s = 32;

    let i = 0;
    let k = 0;

    while (i < l) {
      const n = i + s > l ? l - i : s;

      for (let j = 0; j < n; j++) {
        c[k] |= cs[i + j] << n - (j + 1);
      }

      k += 1;
      i += n;
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
  size() {
    return this.l;
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
  get(i) {
    const l = this.l;
    const c = this.c;
    const s = this.s;

    if (i < 0 || i >= l) {
      return;
    }

    const d = i / s | 0;
    const r = i % s;
    const j = d * s;
    const n = c[d];
    const p = j + s > l ? l - j : s;

    return (n >> (p - r - 1)) & 1;
  }
}

/**
 * Compute the distance between two vectors.
 *
 * @see http://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan
 *
 * @param {Vector} u
 * @param {Vector} v
 * @return {number}
 * @private
 */
export function distance(u, v) {
  let d = 0;

  for (let i = 0, n = u.c.length; i < n; i++) {
    let x = u.c[i] ^ v.c[i];

    for (d; x; d++) {
      x &= x - 1;
    }
  }

  return d;
}
