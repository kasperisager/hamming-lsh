import * as Vector from './vector';
import {random} from './family';

/**
 * Amplify a family of functions by composing a new family where each function consist of `r` functions from the
 * original family passed through `fn`.
 *
 * @param {Array<Function>} family
 * @param {number} r
 * @param {Function} fn
 * @return {Array<Function>}
 */
function amplify(family, r, fn) {
  const {length} = family;

  if (r > length) {
    throw new Error('Cannot amplify above size of family');
  }

  const _family = Array(length);

  for (let i = 0, n = length; i < n; i++) {
    const f = random(family, r);
    _family[i] = v => fn(f, v);
  }

  return _family;
}

/**
 * Amplify a family of functions by an AND-construction.
 *
 * @param {Array<Function>} family
 * @param {number} r
 * @return {Array<Function>}
 */
export function and(family, r) {
  return amplify(family, r, (fns, v) => {
    const vs = [];

    for (let i = 0, n = fns.length; i < n; i++) {
      const hs = fns[i](v);

      for (let j = 0, m = hs.length; j < m; j++) {
        vs[j] = vs[j] ? vs[j] : '';
        vs[j] += hs[j];
      }
    }

    return vs;
  });
}

/**
 * Amplify a family of functions by an OR-construction.
 *
 * @param {Array<Function>} family
 * @param {number} b
 * @return {Array<Function>}
 */
export function or(family, b) {
  return amplify(family, b, (fns, v) => {
    const vs = [];

    for (let i = 0, n = fns.length; i < n; i++) {
      const hs = fns[i](v);

      for (let j = 0, m = hs.length; j < m; j++) {
        vs[i] = vs[i] ? vs[i] : '';
        vs[i] += hs[j];
      }
    }

    return vs;
  });
}
