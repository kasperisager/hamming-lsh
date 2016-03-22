import {select} from './family';

/**
 * Construct a new hash function from a list of hash functions `fns` where each computed hash is passed through `fn`.
 *
 * @param {Array<Function>} fns
 * @param {Function} fn
 * @return {Function}
 * @private
 */
function hash(fns, fn) {
  return function (v) {
    const vs = [];

    for (let i = 0, n = fns.length; i < n; i++) {
      const hs = fns[i](v);

      for (let j = 0, m = hs.length; j < m; j++) {
        fn(hs, vs, i, j, n, m);
      }
    }

    return vs;
  };
}

/**
 * Amplify a family of functions by composing a new family where each function consist of `r` functions from the
 * original family passed through `fn`.
 *
 * @param {Array<Function>} f
 * @param {number} r
 * @param {Function} fn
 * @return {Array<Function>}
 * @private
 */
function amplify(f, r, fn) {
  if (r > f.length) {
    throw new Error('Cannot amplify above size of family');
  }

  const fm = Array(f.length);

  for (let i = 0, n = fm.length; i < n; i++) {
    const fs = select(f, r);
    const h = hash(fs, fn);

    fm[i] = v => h(v);
  }

  return fm;
}

/**
 * Amplify a family `f` of functions by an AND-construction.
 *
 * @see https://en.wikipedia.org/wiki/Locality-sensitive_hashing#Amplification
 *
 * @param {Array<Function>} f
 * @param {number} r
 * @return {Array<Function>}
 * @private
 */
export function and(f, r) {
  return amplify(f, r, (hs, vs, i, j) => {
    vs[j] = (vs[j] ? vs[j] : '') + hs[j];
  });
}

/**
 * Amplify a family `f` of functions by an OR-construction.
 *
 * @see https://en.wikipedia.org/wiki/Locality-sensitive_hashing#Amplification
 *
 * @param {Array<Function>} f
 * @param {number} b
 * @return {Array<Function>}
 * @private
 */
export function or(f, b) {
  return amplify(f, b, (hs, vs, i, j) => {
    vs[i] = hs[j];
  });
}
