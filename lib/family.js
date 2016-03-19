/**
 * Construct a family of functions for a given number of dimensions.
 *
 * @param {number} d
 * @return {Array<Function>}
 * @private
 */
export default function family(d) {
  let f = Array(d);

  for (let i = 0; i < d; i++) {
    f[i] = v => [v[i]];
  }

  return f;
}

/**
 * Select either a single or `n` independently and uniformly random functions from a family `f`.
 *
 * @param {Array<Function>} f
 * @param {number} [n]
 * @return {Function|Array<Function>}
 * @private
 */
export function select(f, n) {
  const {floor, random} = Math;

  if (n === undefined) {
    // Grab a function by a random index.
    return f[floor(random() * family.length)];
  }

  const fns = Array(n);

  for (let i = 0; i < n; i++) {
    fns[i] = select(f);
  }

  return fns;
}
