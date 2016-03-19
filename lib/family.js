/**
 * Construct a family of functions for a given number of dimensions.
 *
 * @param {number} d
 * @return {Array<Function>}
 */
export default function family(d) {
  let family = Array(d);

  for (let i = 0; i < d; i++) {
    family[i] = v => [v[i]];
  }

  return family;
}

/**
 * Select either a single or `n` independently and uniformly random functions from a family.
 *
 * @param {Array<Function>} family
 * @param {number} [n]
 * @return {Function|Array<Function>}
 */
export function select(family, n) {
  const {floor, random} = Math;

  if (n === undefined) {
    // Grab a function by a random index.
    return family[floor(random() * family.length)];
  }

  const functions = Array(n);

  for (let i = 0; i < n; i++) {
    functions[i] = select(family);
  }

  return functions;
}
