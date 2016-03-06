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
    _family[i] = v => fn(random(family, r), v);
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
  return amplify(family, r, (functions, v) => {
    for (let i = 0, n = functions.length; i < n; i++) {
    }
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
  return amplify(family, b, (functions, v) => {
    for (let i = 0, n = functions.length; i < n; i++) {
    }
  });
}
