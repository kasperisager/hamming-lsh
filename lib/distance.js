/**
 * Compute the Hamming distance between two vectors.
 *
 * @param {Array<number>} v1
 * @param {Array<number>} v2
 * @return {number}
 */
export default function distance(v1, v2) {
  if (v1.length !== v2.length) {
    return NaN;
  }

  let distance = 0;

  for (let i = 0, n = v1.length; i < n; i++) {
    distance += (v1[i] - v2[i]) !== 0;
  }

  return distance;
}
