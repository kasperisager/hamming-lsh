/**
 * [Vector description]
 * @param {[type]} ...c [description]
 */
export default function Vector(...c) {
  const {length} = c;

  let value = 0;

  // Concatenate the binary components to a single integer.
  for (let i = 0, n = length; i < n; i++) {
    value |= c[i] << n - (i + 1);
  }

  /**
   * [toString description]
   * @return {[type]} [description]
   */
  function toString() {
    return `Vector[value=${value.toString(2)}, length=${length}]`;
  }

  return {...c, value, length, toString};
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
export function distance(u, v) {
  let x = u.value ^ v.value;
  let d;

  for (d = 0; x; d++) {
    x &= x - 1;
  }

  return d;
}
