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
    const s = this.s = 30;

    let i = 0;

    while (i < l) {
      const n = i + s > l ? l - i : s;

      let e = 0;

      for (let j = 0; j < n; j++) {
        e |= (cs[i + j] ? 1 : 0) << n - j - 1;
      }

      c[c.length] = e;
      i += n;
    }
  }

  /**
   * Get the number of components in this vector.
   *
   * @memberof Vector
   * @return {number} The number of components in this vector.
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
   * Get the component at the specified index of this vector.
   *
   * @param {number} i The index of the component to get.
   * @return {number} The component at the index if found, otherwise `undefined`.
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
    const j = d * s;
    const p = j + s > l ? l - j : s;

    return (c[d] >> (p - (i % s) - 1)) & 1;
  }

  /**
   * Compupte the hash of this vector.
   *
   * @return {number} The hash of this vector.
   */
  hash() {
    const c = this.c;

    let b = 7;

    for (let i = 0, n = c.length; i < n; i++) {
      b ^= 31 * b + c[i] + (b << 6) + (b >> 2);
    }

    return b ^ (b >> 32);
  }

  /**
   * Check if this vector is equal to another.
   *
   * @param {Vector} v The vector to check against.
   * @return {boolean} `true` if the vectors are equal, otherwise `false`.
   */
  equals(v) {
    return Vector.distance(this, v) === 0;
  }

  /**
   * Return a string representation of this vector.
   *
   * @return {string} The string representation of the vector.
   */
  toString() {
    let s = 'Vector[';

    for (let i = 0, n = this.l; i < n; i++) {
      s += this.get(i);
    }

    return s + ']';
  }

  /**
   * Compute the distance between two vectors.
   *
   * @see http://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan
   *
   * @param {Vector} u
   * @param {Vector} v
   * @return {number}
   */
  static distance(u, v) {
    let d = 0;

    for (let i = 0, n = u.c.length; i < n; i++) {
      let x = u.c[i] ^ v.c[i];

      for (d; x; d++) {
        x &= x - 1;
      }
    }

    return d;
  }

  /**
   * Construct a random vector of a given length.
   *
   * @param {number} l
   * @return {Vector}
   */
  static random(l) {
    const c = Array(l);

    for (let i = 0; i < l; i++) {
      c[i] = (Math.random() + 0.5) | 0;
    }

    return new Vector(c);
  }
}
