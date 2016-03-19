/**
 * @constructor
 * @param {...number} cs The components of the vector.
 *
 * @property {number} value The binary value of the vector.
 * @property {number} length The number of components in the vector.
 *
 * @example
 * const v = Vector(1, 0, 1);
 *
 * v[0]; // => 1
 * v[1]; // => 0
 * v[2]; // => 1
 *
 * v.value; // => 101
 * v.length; // => 3
 */
export default function Vector(...cs) {
  const {length} = cs;

  let value = 0;

  // Concatenate the binary components to a single integer.
  for (let i = 0, n = length; i < n; i++) {
    value |= cs[i] << n - (i + 1);
  }

  return {...cs, value, length};
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
  let x = u.value ^ v.value;
  let d;

  for (d = 0; x; d++) {
    x &= x - 1;
  }

  return d;
}
