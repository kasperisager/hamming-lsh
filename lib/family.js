/**
 * Construct a family of functions for a given number of dimensions.
 *
 * @param {number} d
 * @return {Array<Function>}
 */
export default function family(d) {
  let family = Array(d);

  for (let i = 0; i < d; i++) {
    family[i] = v => [`@${v[i]}`];
  }

  return family;
}

/**
 * Pick either a single or `n` independently and uniformly random functions from a family.
 *
 * @param {Array<Function>} family
 * @param {number} [n]
 * @return {Function|Array<Function>}
 */
export function random(family, n) {
  if (n === undefined) {
    return family[Math.floor(Math.random() * family.length)];
  }

  const functions = Array(n);

  for (let i = 0; i < n; i++) {
    functions[i] = random(family);
  }

  return functions;
}
